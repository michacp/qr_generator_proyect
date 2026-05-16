// src/components/qr/DownloadPanel.tsx
import type { DownloadOptions, DownloadFormat, Translations } from './types';
import { DOWNLOAD_FORMATS, DOWNLOAD_SIZES } from './types';
import { Field } from './ui/Field';

interface DownloadPanelProps {
  options:    DownloadOptions;
  disabled:   boolean;
  t:          Translations;
  onChange:   (patch: Partial<DownloadOptions>) => void;
  onDownload: () => void;
}

const FORMAT_BADGE: Record<DownloadFormat, string> = {
  png:  'bg-blue-500/20 text-blue-300',
  svg:  'bg-emerald-500/20 text-emerald-300',
  jpeg: 'bg-orange-500/20 text-orange-300',
  webp: 'bg-violet-500/20 text-violet-300',
};

export function DownloadPanel({ options, disabled, t, onChange, onDownload }: DownloadPanelProps) {
  const td = t.download;
  const formatHints = td.format_hints as Record<string, string>;
  const sizeHints   = td.hints        as Record<string, string>;

  return (
    <div className="w-full space-y-3">
      {/* selects en fila */}
      <div className="grid grid-cols-2 gap-3 items-end">

        {/* Formato */}
        <Field label={td.format_label} tooltip={td.format_tooltip}>
          <div className="relative">
            <select
              value={options.format}
              onChange={e => onChange({ format: e.target.value as DownloadFormat })}
              className="w-full bg-[#1c1c26] border border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition appearance-none cursor-pointer"
            >
              {DOWNLOAD_FORMATS.map(f => (
                <option key={f} value={f}>{f.toUpperCase()}</option>
              ))}
            </select>
            {/* chevron */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </span>
          </div>
          {/* badge del formato activo */}
          <span className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${FORMAT_BADGE[options.format]}`}>
            {formatHints[options.format] ?? ''}
          </span>
        </Field>

        {/* Tamaño */}
        <Field label={td.size_label} tooltip={td.size_tooltip}>
          <div className="relative">
            <select
              value={options.size}
              onChange={e => onChange({ size: Number(e.target.value) })}
              className="w-full bg-[#1c1c26] border border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition appearance-none cursor-pointer"
            >
              {DOWNLOAD_SIZES.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </span>
          </div>
          {/* hint del tamaño activo */}
          <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 text-slate-400">
            {sizeHints[String(options.size)] ?? ''}
          </span>
        </Field>
      </div>

      {/* botón de descarga */}
      <button
        onClick={onDownload}
        disabled={disabled}
        className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-violet-300 font-semibold rounded-xl py-3 text-sm border border-white/10 transition-all active:scale-95"
      >
        <DownloadIcon />
        {td.btn_download} · {options.size}px · {options.format.toUpperCase()}
      </button>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
    </svg>
  );
}