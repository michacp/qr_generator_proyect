// src/components/qr/QrForm.tsx
import type { DotType } from 'qr-code-styling';
import type { QrFormValues, Translations } from './types';
import { QR_DEFAULTS } from './types';
import { Field }         from './ui/Field';
import { ColorPicker }   from './ui/ColorPicker';
import { ImageUploader } from './ImageUploader';

// Modelos construidos desde las traducciones
function getModels(t: Translations) {
  return [
    { name: t.models.square,          value: 'square'         },
    { name: t.models.rounded,         value: 'rounded'        },
    { name: t.models.dots,            value: 'dots'           },
    { name: t.models['extra-rounded'], value: 'extra-rounded' },
    { name: t.models.classy,          value: 'classy'         },
    { name: t.models['classy-rounded'], value: 'classy-rounded' },
  ] as { name: string; value: DotType }[];
}

interface QrFormProps {
  form: QrFormValues;
  croppedImage: string;
  t: Translations;
  onChange: (patch: Partial<QrFormValues>) => void;
  onCropApplied: (dataUrl: string) => void;
  onRemoveImage: () => void;
}

export function QrForm({ form, croppedImage, t, onChange, onCropApplied, onRemoveImage }: QrFormProps) {
  const models = getModels(t);

  return (
    <section className="w-full lg:flex-1 bg-[#13131a] border border-white/[0.07] rounded-3xl p-6 sm:p-8 space-y-6 animate-fade-up shadow-xl">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        {/* col 1 */}
        <div className="space-y-4">
          <Field label={t.form.content_label} tooltip={t.form.content_tooltip} hint={t.form.content_hint}>
            <input type="text" value={form.content}
              onChange={e => onChange({ content: e.target.value })}
              placeholder={t.form.content_placeholder}
              className="w-full bg-[#1c1c26] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition" />
          </Field>

          <Field label={t.form.model_label} tooltip={t.form.model_tooltip} hint={t.form.model_hint}>
            <select value={form.model}
              onChange={e => onChange({ model: e.target.value as DotType })}
              className="w-full bg-[#1c1c26] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition appearance-none cursor-pointer">
              {models.map(m => <option key={m.value} value={m.value}>{m.name}</option>)}
            </select>
          </Field>
        </div>

        {/* col 2 */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label={t.form.dots_color_label} tooltip={t.form.dots_color_tooltip}>
              <ColorPicker value={form.dotsColor} onChange={v => onChange({ dotsColor: v })} />
            </Field>
            <Field label={t.form.bg_color_label} tooltip={t.form.bg_color_tooltip}>
              <ColorPicker value={form.backgroundColor} onChange={v => onChange({ backgroundColor: v })} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label={t.form.qr_margin_label} tooltip={t.form.qr_margin_tooltip} hint={t.form.qr_margin_hint}>
              <input type="number" value={form.qrMargin} min={0} max={50}
                onChange={e => onChange({ qrMargin: Number(e.target.value) })}
                className="w-full bg-[#1c1c26] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition" />
            </Field>
            <Field label={t.form.img_margin_label} tooltip={t.form.img_margin_tooltip} hint={t.form.img_margin_hint}>
              <input type="number" value={form.imageMargin} min={0} max={50}
                onChange={e => onChange({ imageMargin: Number(e.target.value) })}
                className="w-full bg-[#1c1c26] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500 transition" />
            </Field>
          </div>
        </div>
      </div>

      <ImageUploader croppedImage={croppedImage} t={t} onCropApplied={onCropApplied} onRemove={onRemoveImage} />
    </section>
  );
}