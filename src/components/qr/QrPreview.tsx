// src/components/qr/QrPreview.tsx
import type { QrFormValues, Translations } from './types';
import { Row } from './ui/Row';

interface QrPreviewProps {
  previewUrl: string;
  generating: boolean;
  form: QrFormValues;
  t: Translations;
  onGenerate: () => void;
  onDownload: () => void;
}

export function QrPreview({ previewUrl, generating, form, t, onGenerate, onDownload }: QrPreviewProps) {
  // Nombre del modelo activo en el idioma actual
  const activeModelName = (t.models as Record<string, string>)[form.model] ?? form.model;

  return (
    <aside className="w-full lg:w-[300px] flex-shrink-0 flex flex-col gap-4 lg:sticky lg:top-6 animate-fade-up"
      style={{ animationDelay: '0.1s' }}>

      <div className="bg-[#13131a] border border-white/[0.07] rounded-3xl shadow-[0_8px_48px_0_rgba(139,92,246,0.15)] p-6 flex flex-col items-center gap-5">
        <h2 className="font-display text-lg font-bold text-white self-start">{t.preview.title}</h2>

        <div className="relative w-[220px] h-[220px] rounded-2xl overflow-hidden bg-[#1c1c26] ring-1 ring-white/10 flex items-center justify-center">
          {generating && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-violet-400 text-sm font-medium animate-pulse">
              {t.preview.generating}
            </span>
          )}
          {previewUrl
            ? <img src={previewUrl} alt="QR Code" className="w-full h-full object-contain" />
            : <span className="text-slate-600 text-sm">{t.preview.placeholder}</span>
          }
        </div>

        <div className="w-full flex flex-col gap-3">
          <button onClick={onGenerate} disabled={generating}
            className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-all active:scale-95">
            {generating ? t.preview.generating : t.preview.btn_generate}
          </button>
          <button onClick={onDownload} disabled={!previewUrl}
            className="w-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-violet-300 font-semibold rounded-xl py-3 text-sm border border-white/10 transition-all active:scale-95">
            {t.preview.btn_download}
          </button>
        </div>
      </div>

      {/* resumen */}
      <div className="bg-[#13131a] border border-white/[0.07] rounded-2xl px-5 py-4 text-xs text-slate-500 space-y-1.5">
        <p className="font-semibold text-slate-300 mb-2 text-sm">{t.preview.config_title}</p>
        <Row label={t.preview.config_style}>{activeModelName}</Row>
        <Row label={t.preview.config_qr_margin}>{form.qrMargin}px</Row>
        <Row label={t.preview.config_img_margin}>{form.imageMargin}px</Row>
        <Row label={t.preview.config_dots}><ColorSwatch color={form.dotsColor} /></Row>
        <Row label={t.preview.config_bg}><ColorSwatch color={form.backgroundColor} /></Row>
      </div>
    </aside>
  );
}

function ColorSwatch({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full border border-white/10 flex-shrink-0" style={{ background: color }} />
      <span className="font-mono">{color}</span>
    </span>
  );
}