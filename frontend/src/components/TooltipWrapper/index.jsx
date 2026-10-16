import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const TooltipWrapper = ({ children, text, posClass = "tooltip-bottom-left" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const isPinnedByClickRef = useRef(false);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Se o elemento âncora rolou para fora da tela, fecha o balão
    if (rect.bottom < 0 || rect.top > viewportHeight || rect.right < 0 || rect.left > viewportWidth) {
      setIsOpen(false);
      isPinnedByClickRef.current = false;
      return;
    }

    const margin = 12;
    // Largura responsiva do balão (cabe confortavelmente até em telas pequenas como 320px)
    const maxTooltipWidth = 280;
    const tooltipWidth = Math.min(maxTooltipWidth, viewportWidth - margin * 2);

    const triggerCenter = rect.left + rect.width / 2;

    // Determina a posição horizontal preferida
    let left;
    if (posClass.includes('right') && !posClass.includes('center')) {
      left = rect.left;
    } else if (posClass.includes('center')) {
      left = triggerCenter - tooltipWidth / 2;
    } else {
      // default: alinha à direita do trigger (abre para a esquerda)
      left = rect.right - tooltipWidth;
    }

    // Garante que o balão nunca vaze as bordas da tela
    if (left < margin) {
      left = margin;
    } else if (left + tooltipWidth > viewportWidth - margin) {
      left = viewportWidth - tooltipWidth - margin;
    }

    // Calcula a posição horizontal da seta para apontar exatamente para o centro do trigger
    let arrowLeft = triggerCenter - left;
    arrowLeft = Math.max(16, Math.min(tooltipWidth - 16, arrowLeft));

    // Determina se deve abrir para cima ou para baixo
    const preferTop = posClass.includes('top');
    const estimatedHeight = 140;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    let placement = 'bottom';
    let top;

    if (preferTop && spaceAbove > 80) {
      placement = 'top';
      top = rect.top - 8;
    } else if (!preferTop && spaceBelow < estimatedHeight && spaceAbove > spaceBelow) {
      placement = 'top';
      top = rect.top - 8;
    } else {
      placement = 'bottom';
      top = rect.bottom + 8;
    }

    setCoords({
      top,
      left,
      width: tooltipWidth,
      arrowLeft,
      placement
    });
  }, [posClass]);

  // Atualiza posição dinamicamente quando aberto e em eventos de resize/scroll
  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScrollResize = () => {
        updatePosition();
      };
      window.addEventListener('scroll', handleScrollResize, true);
      window.addEventListener('resize', handleScrollResize);
      return () => {
        window.removeEventListener('scroll', handleScrollResize, true);
        window.removeEventListener('resize', handleScrollResize);
      };
    }
  }, [isOpen, updatePosition]);

  // Fecha ao clicar fora ou ao apertar ESC
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e) => {
      if (
        triggerRef.current?.contains(e.target) ||
        tooltipRef.current?.contains(e.target)
      ) {
        return;
      }
      setIsOpen(false);
      isPinnedByClickRef.current = false;
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        isPinnedByClickRef.current = false;
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleTriggerClick = (e) => {
    e.stopPropagation();
    if (isOpen && isPinnedByClickRef.current) {
      isPinnedByClickRef.current = false;
      setIsOpen(false);
    } else {
      isPinnedByClickRef.current = true;
      setIsOpen(true);
    }
  };

  const handleMouseEnter = () => {
    // Ativa no hover apenas em dispositivos que realmente suportam hover
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinnedByClickRef.current) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleTriggerClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-expanded={isOpen}
        aria-label="Mais informações"
        className="inline-flex items-center justify-center p-1.5 -m-1.5 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer"
      >
        {children}
      </button>

      {isOpen && coords && typeof document !== 'undefined' && createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          onMouseEnter={() => {
            if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
              setIsOpen(true);
            }
          }}
          onMouseLeave={() => {
            if (!isPinnedByClickRef.current) {
              setIsOpen(false);
            }
          }}
          style={{
            position: 'fixed',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            width: `${coords.width}px`,
            transform: coords.placement === 'top' ? 'translateY(-100%)' : 'none',
            zIndex: 99999,
          }}
          className="bg-zinc-900 text-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 text-xs leading-relaxed font-normal p-3.5 rounded-2xl shadow-2xl border border-zinc-700/80 dark:border-zinc-600/80 animate-in fade-in zoom-in-95 duration-150 select-text"
        >
          {/* Seta indicadora apontando para o ícone de ajuda */}
          <div
            style={{ left: `${coords.arrowLeft}px` }}
            className={`absolute w-3 h-3 bg-zinc-900 dark:bg-zinc-800 border-zinc-700/80 dark:border-zinc-600/80 rotate-45 pointer-events-none -translate-x-1/2 ${
              coords.placement === 'top'
                ? '-bottom-1.5 border-b border-r'
                : '-top-1.5 border-t border-l'
            }`}
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-start justify-between gap-2.5">
            <div className="flex-1 min-w-0 pr-1">
              {text}
            </div>
            {/* Botão de fechar prático para toque mobile */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                isPinnedByClickRef.current = false;
              }}
              aria-label="Fechar ajuda"
              className="text-zinc-400 hover:text-zinc-100 dark:hover:text-white p-1 -mr-1 -mt-1 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors shrink-0 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default TooltipWrapper;
