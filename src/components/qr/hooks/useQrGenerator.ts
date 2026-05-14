// src/components/qr/hooks/useQrGenerator.ts
import { useState, useRef, useCallback, useEffect } from 'react';
import QRCodeStyling, { type DrawType } from 'qr-code-styling';
import type { QrFormValues } from '../types';
import { QR_DEFAULTS } from '../types';

export function useQrGenerator() {
    const [form, setForm] = useState<QrFormValues>(QR_DEFAULTS);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [generating, setGenerating] = useState(false);
    const [croppedImage, setCroppedImage] = useState<string>('');

    const qrRef = useRef<QRCodeStyling | null>(null);

    const generateQr = useCallback(async (overrideCropped?: string) => {
        setGenerating(true);
        const image = (overrideCropped ?? croppedImage) || undefined;

        qrRef.current = new QRCodeStyling({
            width: 300,
            height: 300,
            type: 'png' as DrawType,
            data: form.content || 'https://example.com',
            image,
            margin: form.qrMargin,
            dotsOptions: { type: form.model, color: form.dotsColor },
            backgroundOptions: { color: form.backgroundColor },
            imageOptions: { crossOrigin: 'anonymous', margin: form.imageMargin },
        });

        setTimeout(async () => {
            try {
                const blob = await qrRef.current!.getRawData();
                if (blob instanceof Blob) {
                    setPreviewUrl(prev => {
                        if (prev) URL.revokeObjectURL(prev);
                        return URL.createObjectURL(blob as Blob);
                    });
                }
            } finally {
                setGenerating(false);
            }
        }, 120);
    }, [form, croppedImage]);

    // Regenerar automáticamente al cambiar el formulario
    useEffect(() => { generateQr(); }, [form]);

    const downloadQr = () =>
        qrRef.current?.download({ name: 'qr-code', extension: 'png' });

    const applyImage = (dataUrl: string) => {
        setCroppedImage(dataUrl);
        generateQr(dataUrl);
    };

    const removeImage = () => {
        setCroppedImage('');
        generateQr('');
    };

    return {
        form,
        setForm,
        previewUrl,
        generating,
        croppedImage,
        generateQr,
        downloadQr,
        applyImage,
        removeImage,
    };
}