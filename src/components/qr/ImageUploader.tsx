// src/components/qr/ImageUploader.tsx
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useImageCrop } from './hooks/useImageCrop';
import type { Translations } from './types';

interface ImageUploaderProps {
  croppedImage: string;
  t: Translations;
  onCropApplied: (dataUrl: string) => void;
  onRemove: () => void;
}

export function ImageUploader({ croppedImage, t, onCropApplied, onRemove }: ImageUploaderProps) {
  const {
    imgSrc, crop, setCrop, setCompletedCrop,
    imgRef, canvasRef,
    onFileChange, onDrop, onImageLoad,
    applyCrop, cancelCrop,
  } = useImageCrop({ onCropApplied });

  return (
    <div>
      <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-2">
        {t.form.image_section_label}
      </p>

      {/* drop zone */}
      {!imgSrc && !croppedImage && (
        <label htmlFor="fileInput" onDragOver={e => e.preventDefault()} onDrop={onDrop}
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/10 rounded-2xl p-6 cursor-pointer hover:border-violet-500/50 hover:bg-violet-900/10 transition-all text-center">
          <UploadIcon />
          <span className="text-sm text-slate-400">
            {t.form.dropzone_text}{' '}
            <span className="text-violet-400 font-semibold">{t.form.dropzone_cta}</span>
          </span>
          <span className="text-xs text-slate-600">{t.form.dropzone_hint}</span>
          <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        </label>
      )}

      {/* cropper tamaño fijo */}
      {imgSrc && (
        <div className="border border-white/10 rounded-2xl bg-[#1c1c26] overflow-hidden">
          <div className="h-52 flex items-center justify-center bg-[#111118] overflow-hidden">
            <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={c => setCompletedCrop(c)}
              aspect={1} style={{ maxHeight: '208px', display: 'flex', alignItems: 'center' }}>
              <img ref={imgRef} src={imgSrc} onLoad={onImageLoad} alt="recorte"
                style={{ maxHeight: '208px', maxWidth: '100%', objectFit: 'contain', display: 'block' }} />
            </ReactCrop>
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex gap-2 p-3">
            <button onClick={applyCrop}
              className="flex-1 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl py-2 transition active:scale-95">
              {t.form.crop_apply}
            </button>
            <button onClick={cancelCrop}
              className="px-4 bg-white/5 hover:bg-white/10 text-red-400 text-sm font-semibold rounded-xl py-2 transition active:scale-95">
              {t.form.crop_cancel}
            </button>
          </div>
        </div>
      )}

      {/* imagen aplicada */}
      {croppedImage && !imgSrc && (
        <div className="flex items-center gap-4 bg-violet-900/20 border border-violet-700/30 rounded-2xl px-4 py-3">
          <img src={croppedImage} alt="logo" className="w-12 h-12 rounded-xl object-cover ring-2 ring-violet-500/40" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">{t.form.image_applied_title}</p>
            <p className="text-xs text-slate-500 truncate">{t.form.image_applied_hint}</p>
          </div>
          <button onClick={onRemove} className="text-red-400/70 hover:text-red-400 transition">
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg className="w-9 h-9 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M4 16l4-4m0 0l4 4m-4-4v12M20 16l-4-4m0 0l-4 4m4-4V4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}