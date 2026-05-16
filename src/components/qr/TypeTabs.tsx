// src/components/qr/TypeTabs.tsx
import type { QrType, Translations } from './types';

/* SVG icons inline — sin dependencias externas */
const ICONS: Record<QrType, JSX.Element> = {
  url: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  text: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  ),
  wifi: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  ),
};

const QR_TYPES: QrType[] = ['url', 'text', 'wifi'];

interface TypeTabsProps {
  active: QrType;
  t: Translations;
  onChange: (type: QrType) => void;
}

export function TypeTabs({ active, t, onChange }: TypeTabsProps) {
  return (
    <div className="space-y-2">
      {/* tabs */}
      <div className="flex gap-1 bg-[#1c1c26] border border-white/10 rounded-2xl p-1">
        {QR_TYPES.map(type => {
          const isActive = type === active;
          return (
            <button
              key={type}
              onClick={() => onChange(type)}
              className={`
                flex-1 flex items-center justify-center gap-2
                px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                ${isActive
                  ? 'bg-violet-600 text-white shadow-[0_2px_8px_0_rgba(124,58,237,0.4)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }
              `}
            >
              {ICONS[type]}
              <span>{t.qr_types[type].label}</span>
            </button>
          );
        })}
      </div>
      {/* hint del tipo seleccionado */}
      <p className="text-xs text-slate-500 pl-1">{t.qr_types[active].hint}</p>
    </div>
  );
}