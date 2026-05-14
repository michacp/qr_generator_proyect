// src/components/QrGenerator.tsx
import { useState } from 'react';
import { useQrGenerator } from './qr/hooks/useQrGenerator';
import { PageHeader }     from './qr/ui/PageHeader';
import { GuidedTour }     from './qr/ui/GuidedTour';
import { QrForm }         from './qr/QrForm';
import { QrPreview }      from './qr/QrPreview';
import type { Translations } from './qr/types';
import type { Locale }       from '../i18n';
import { LOCALES }           from '../i18n';

interface QrGeneratorProps {
  t: Translations;
  lang: Locale;
}

const FLAG: Record<Locale, string> = { es: '🇪🇸', en: '🇬🇧' };
const LABEL: Record<Locale, string> = { es: 'ES', en: 'EN' };

export default function QrGenerator({ t, lang }: QrGeneratorProps) {
  const {
    form, setForm,
    previewUrl, generating,
    croppedImage,
    generateQr, downloadQr,
    applyImage, removeImage,
  } = useQrGenerator();

  const [tourKey, setTourKey] = useState(0);
  const reopenTour = () => { localStorage.removeItem('qr_tour_done'); setTourKey(k => k + 1); };

  const switchLang = (target: Locale) => {
    if (target !== lang) window.location.href = `/${target}/`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-10 font-body text-slate-200">
      <GuidedTour key={tourKey} t={t} />

      <PageHeader t={t} />

      {/* barra de acciones superiores */}
      <div className="max-w-5xl mx-auto flex items-center justify-end gap-3 mb-3">

        {/* selector de idioma */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
          {LOCALES.map(l => (
            <button key={l} onClick={() => switchLang(l)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                l === lang
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}>
              <span>{FLAG[l]}</span>
              <span>{LABEL[l]}</span>
            </button>
          ))}
        </div>

        {/* botón de ayuda */}
        <button onClick={reopenTour}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-violet-400 transition">
          <span className="w-5 h-5 rounded-full bg-white/10 hover:bg-violet-500/20 flex items-center justify-center font-bold text-[11px]">?</span>
          {t.howto}
        </button>
      </div>

      <main className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        <QrForm
          form={form}
          croppedImage={croppedImage}
          t={t}
          onChange={patch => setForm(f => ({ ...f, ...patch }))}
          onCropApplied={applyImage}
          onRemoveImage={removeImage}
        />
        <QrPreview
          previewUrl={previewUrl}
          generating={generating}
          form={form}
          t={t}
          onGenerate={() => generateQr()}
          onDownload={downloadQr}
        />
      </main>
    </div>
  );
}