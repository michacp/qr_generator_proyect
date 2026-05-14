// src/components/qr/hooks/useImageCrop.ts
import { useState, useRef, useCallback } from 'react';
import { centerCrop, makeAspectCrop, type Crop } from 'react-image-crop';

function centerAspectCrop(w: number, h: number): Crop {
    return centerCrop(makeAspectCrop({ unit: '%', width: 80 }, 1, w, h), w, h);
}

interface UseImageCropOptions {
    /** Callback que recibe el dataURL del recorte final */
    onCropApplied: (dataUrl: string) => void;
}

export function useImageCrop({ onCropApplied }: UseImageCropOptions) {
    const [imgSrc, setImgSrc] = useState<string>('');
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<Crop>();
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Carga un File como base64 en imgSrc
    const loadFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => setImgSrc(reader.result as string);
        reader.readAsDataURL(file);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) loadFile(f);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f) loadFile(f);
    };

    // Inicializa el crop centrado cuando la imagen carga
    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height));
    };

    // Aplica el recorte sobre un <canvas> oculto y devuelve el dataURL
    const applyCrop = useCallback(() => {
        if (!completedCrop || !imgRef.current || !canvasRef.current) return;

        const img = imgRef.current;
        const canvas = canvasRef.current;
        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const pr = window.devicePixelRatio;
        const cw = completedCrop.width * scaleX;
        const ch = completedCrop.height * scaleY;

        canvas.width = cw * pr;
        canvas.height = ch * pr;
        ctx.setTransform(pr, 0, 0, pr, 0, 0);
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(
            img,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            cw, ch,
            0, 0, cw, ch,
        );

        const dataUrl = canvas.toDataURL('image/png');
        setImgSrc(''); // cierra el cropper
        onCropApplied(dataUrl);
    }, [completedCrop, onCropApplied]);

    const cancelCrop = () => setImgSrc('');

    return {
        imgSrc,
        crop,
        setCrop,
        completedCrop,
        setCompletedCrop,
        imgRef,
        canvasRef,
        onFileChange,
        onDrop,
        onImageLoad,
        applyCrop,
        cancelCrop,
    };
}