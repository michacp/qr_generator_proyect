// src/components/qr/QrForm.tsx
import type { DotType } from 'qr-code-styling';
import type { QrFormValues, Translations } from './types';
import { Field }         from './ui/Field';
import { ColorPicker }   from './ui/ColorPicker';
import { ImageUploader } from './ImageUploader';
import { TypeTabs }      from './TypeTabs';
import { WifiForm }      from './WifiForm';
import { ModelPicker }   from './ModelPicker';

interface QrFormProps {
  form: QrFormValues;
  croppedImage: string;
  t: Translations;
  onChange: (patch: Partial<QrFormValues>) => void;
  onCropApplied: (dataUrl: string) => void;
  onRemoveImage: () => void;
}

const inputCls = "w-full bg-[#1c1c26] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition";

const cardCls = "bg-[#1a1a24] border border-white/[0.06] rounded-2xl p-4 space-y-3";

export function QrForm({ form, croppedImage, t, onChange, onCropApplied, onRemoveImage }: QrFormProps) {
  const isWifi = form.qrType === 'wifi';
  const isUrl  = form.qrType === 'url';

  return (
    <section className="w-full lg:flex-1 bg-[#13131a] border border-white/[0.07] rounded-3xl p-6 sm:p-8 space-y-6 animate-fade-up shadow-xl">

      {/* ── Tabs de tipo ── */}
      <TypeTabs active={form.qrType} t={t} onChange={type => onChange({ qrType: type })} />

      {/* ── Contenido según tipo ── */}
      {!isWifi ? (
        <Field
          label={isUrl ? t.form.content_label : t.qr_types.text.label}
          tooltip={isUrl ? t.form.content_tooltip_url : t.form.content_tooltip_text}
          hint={isUrl ? t.form.content_hint_url : t.form.content_hint_text}
        >
          {isUrl ? (
            <input type="url" value={form.content}
              onChange={e => onChange({ content: e.target.value })}
              placeholder={t.form.content_placeholder_url}
              className={inputCls} />
          ) : (
            <textarea value={form.content}
              onChange={e => onChange({ content: e.target.value })}
              placeholder={t.form.content_placeholder_text}
              rows={3} className={`${inputCls} resize-none`} />
          )}
        </Field>
      ) : (
        <WifiForm wifi={form.wifi} t={t}
          onChange={patch => onChange({ wifi: { ...form.wifi, ...patch } })} />
      )}

      {/* ── Selector visual de estilo ── */}
      <ModelPicker value={form.model} t={t}
        onChange={model => onChange({ model: model as DotType })} />

      {/* ── Tarjeta de colores ── */}
      <div className={cardCls}>
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
          Colores
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Field label={t.form.dots_color_label} tooltip={t.form.dots_color_tooltip}>
            <ColorPicker value={form.dotsColor} onChange={v => onChange({ dotsColor: v })} />
          </Field>
          <Field label={t.form.bg_color_label} tooltip={t.form.bg_color_tooltip}>
            <ColorPicker value={form.backgroundColor} onChange={v => onChange({ backgroundColor: v })} />
          </Field>
        </div>
      </div>

      {/* ── Tarjeta de márgenes ── */}
      <div className={cardCls}>
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
          Márgenes
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Field label={t.form.qr_margin_label} tooltip={t.form.qr_margin_tooltip} hint={t.form.qr_margin_hint}>
            <input type="number" value={form.qrMargin} min={0} max={50}
              onChange={e => onChange({ qrMargin: Number(e.target.value) })}
              className={inputCls} />
          </Field>
          <Field label={t.form.img_margin_label} tooltip={t.form.img_margin_tooltip} hint={t.form.img_margin_hint}>
            <input type="number" value={form.imageMargin} min={0} max={50}
              onChange={e => onChange({ imageMargin: Number(e.target.value) })}
              className={inputCls} />
          </Field>
        </div>
      </div>

      {/* ── Logo ── */}
      <ImageUploader croppedImage={croppedImage} t={t}
        onCropApplied={onCropApplied} onRemove={onRemoveImage} />
    </section>
  );
}