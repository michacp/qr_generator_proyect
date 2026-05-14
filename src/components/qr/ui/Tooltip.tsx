// src/components/qr/ui/Tooltip.tsx
import { useState } from 'react';

interface TooltipProps {
  text: string;
}

/**
 * Ícono "?" que muestra un tooltip al hover y al focus (accesible con teclado).
 * Se usa junto a un <Field> label para explicar qué hace ese campo.
 */
export function Tooltip({ text }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        aria-label={`Ayuda: ${text}`}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="w-4 h-4 rounded-full bg-white/10 hover:bg-violet-500/30 text-slate-400 hover:text-violet-300 text-[10px] font-bold flex items-center justify-center transition focus:outline-none focus:ring-1 focus:ring-violet-500"
      >
        ?
      </button>

      {visible && (
        <span
          role="tooltip"
          className="
            absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50
            w-56 px-3 py-2 rounded-xl
            bg-[#1e1e2e] border border-white/10
            text-xs text-slate-300 leading-relaxed
            shadow-[0_4px_24px_0_rgba(0,0,0,0.5)]
            pointer-events-none
          "
        >
          {text}
          {/* flechita */}
          <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#1e1e2e]" />
        </span>
      )}
    </span>
  );
}