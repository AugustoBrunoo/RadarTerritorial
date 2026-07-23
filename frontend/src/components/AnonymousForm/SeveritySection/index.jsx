import React from "react";
import {
  Info,
  History,
  AlertCircle,
  AlertTriangle,
  Minus,
  Check,
} from "lucide-react";

const SeverityOption = ({
  value,
  title,
  desc,
  icon: Icon,
  color,
  formSeverity,
  onToggle,
  fullWidth,
}) => {
  // formSeverity should be an array of values
  const isSelected =
    Array.isArray(formSeverity) && formSeverity.includes(value);

  // Tailwind dynamic class maps based on color props
  const colorMap = {
    blue: "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
    purple:
      "border-purple-500 bg-purple-50/50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400",
    amber:
      "border-amber-500 bg-amber-50/50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400",
    red: "border-red-500 bg-red-50/50 dark:bg-red-900/20 text-red-700 dark:text-red-400",
    zinc: "border-zinc-500 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
  };

  const iconBgMap = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    amber:
      "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    zinc: "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400",
  };

  const selectedClass = colorMap[color] || colorMap.zinc;
  const iconClass = iconBgMap[color] || iconBgMap.zinc;

  return (
    <label
      className={`cursor-pointer group relative ${fullWidth ? "sm:col-span-2" : ""}`}
    >
      <input
        type="checkbox"
        name="gravidade"
        value={value}
        className="peer sr-only"
        checked={isSelected}
        onChange={() => onToggle(value)}
      />
      <div
        className={`p-5 rounded-2xl border-2 transition-all flex flex-col gap-2 h-full shadow-sm
        ${
          isSelected
            ? selectedClass
            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900"
        }
      `}
      >
        {/* Animated Check Icon on Top Right */}
        <div
          className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
          ${isSelected ? "bg-" + color + "-500 scale-100 opacity-100" : "scale-50 opacity-0"}
        `}
        >
          <Check className="w-4 h-4 text-white" />
        </div>

        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors
          ${isSelected ? "bg-white/80 dark:bg-white/20" : iconClass}
        `}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={`font-bold ${isSelected ? "" : "text-zinc-900 dark:text-white"}`}
        >
          {title}
        </span>
        {desc && (
          <span
            className={`text-sm ${isSelected ? "opacity-90" : "text-zinc-500 dark:text-zinc-400"}`}
          >
            {desc}
          </span>
        )}
      </div>
    </label>
  );
};

export default function SeveritySection({
  activeFormSection,
  formSeverity,
  setFormSeverity,
}) {
  const handleSeverityToggle = (value) => {
    setFormSeverity((prev) => {
      const isArr = Array.isArray(prev) ? prev : [];
      let nextState;
      if (value === "nenhum") {
        nextState = isArr.includes("nenhum") ? [] : ["nenhum"];
      } else {
        const withoutNenhum = isArr.filter((v) => v !== "nenhum");
        nextState = withoutNenhum.includes(value)
          ? withoutNenhum.filter((v) => v !== value)
          : [...withoutNenhum, value];
      }

      // Auto-scroll after a slight delay
      setTimeout(() => {
        const step4 = document.getElementById("form-sec-4");
        if (step4) {
          step4.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);

      return nextState;
    });
  };

  return (
    <>
      {/*  Bloco 3: Gravidade e Status  */}
      <div
        id="form-sec-3"
        className={`bg-white transition-all duration-500 ${activeFormSection >= 3 ? "opacity-100 pointer-events-auto" : "opacity-40 pointer-events-none"}  dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-500">
            3
          </div>
          <h3 className="text-xl font-bold">Qual o nível de urgência?</h3>
        </div>
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-6 pl-11">
          Você pode escolher mais de uma opção (Opcional).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SeverityOption
            value="recente"
            title="Problema Recente"
            desc="Apareceu há pouco tempo. O impacto no dia a dia ainda é pequeno."
            icon={Info}
            color="blue"
            formSeverity={formSeverity}
            onToggle={handleSeverityToggle}
          />
          <SeverityOption
            value="abandono"
            title="Muito tempo abandonado"
            desc="Situação crônica. Já faz meses ou anos que ninguém resolve."
            icon={History}
            color="purple"
            formSeverity={formSeverity}
            onToggle={handleSeverityToggle}
          />
          <SeverityOption
            value="urgente"
            title="Urgente"
            desc="Causa grandes transtornos no trânsito, pedestres ou moradores locais."
            icon={AlertCircle}
            color="amber"
            formSeverity={formSeverity}
            onToggle={handleSeverityToggle}
          />
          <SeverityOption
            value="grave"
            title="Grave / Risco de Acidente"
            desc="Risco iminente de machucar alguém, danificar carros ou falta de segurança."
            icon={AlertTriangle}
            color="red"
            formSeverity={formSeverity}
            onToggle={handleSeverityToggle}
          />
          <SeverityOption
            value="nenhum"
            title="Não sei informar / Prefiro não responder"
            icon={Minus}
            color="zinc"
            formSeverity={formSeverity}
            onToggle={handleSeverityToggle}
            fullWidth={true}
          />
        </div>
      </div>
    </>
  );
}
