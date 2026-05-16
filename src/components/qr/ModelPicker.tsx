// src/components/qr/ModelPicker.tsx
import type { DotType } from 'qr-code-styling';
import type { Translations } from './types';

const MODEL_KEYS: DotType[] = [
  'square', 'rounded', 'dots', 'extra-rounded', 'classy', 'classy-rounded',
];

interface ModelPickerProps {
  value: DotType;
  t: Translations;
  onChange: (model: DotType) => void;
}

/**
 * Fila horizontal scrolleable de estilos de puntos.
 * Cada opción muestra la imagen en public/models/{key}.png y el nombre traducido.
 * Si la imagen no existe todavía muestra un placeholder con el inicial.
 */
export function ModelPicker({ value, t, onChange }: ModelPickerProps) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {t.form.model_label}
        </label>
      </div>

      {/* scroll horizontal — oculta scrollbar visualmente */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {MODEL_KEYS.map(key => {
          const isActive = key === value;
          const name = (t.models as Record<string, string>)[key] ?? key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onChange(key)}
              className={`
                flex-shrink-0 flex flex-col items-center gap-1.5
                w-[72px] rounded-xl p-2 border transition-all duration-200
                ${isActive
                  ? 'border-violet-500 bg-violet-500/10 shadow-[0_0_0_1px_rgba(139,92,246,0.5)]'
                  : 'border-white/10 bg-[#1c1c26] hover:border-violet-500/40 hover:bg-white/5'
                }
              `}
            >
              {/* imagen del estilo — la pones en public/models/{key}.png */}
              <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-[#111118]">
                <img
                  src={`/models/${key}.png`}
                  alt={name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Si la imagen no existe, muestra un placeholder
                    const el = e.currentTarget;
                    el.style.display = 'none';
                    el.parentElement!.innerHTML = `
                      <span style="font-size:20px;color:#7c3aed;font-weight:700">
                        ${name.charAt(0).toUpperCase()}
                      </span>`;
                  }}
                />
              </div>
              <span className={`text-[10px] font-semibold text-center leading-tight truncate w-full text-center
                ${isActive ? 'text-violet-300' : 'text-slate-500'}`}>
                {name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}