// src/components/qr/hooks/useQrGenerator.ts
import { useState, useRef, useCallback, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { Options } from 'qr-code-styling';
import {
    QR_DEFAULTS, DOWNLOAD_DEFAULTS,
    type QrFormValues, type DownloadOptions, type DownloadFormat,
} from '../types';

const PREVIEW_SIZE = 300;

// FileExtension es el tipo correcto para getRawData() y download()
// DrawType ('svg' | 'canvas') es solo para el renderer interno
type FileExtension = 'png' | 'svg' | 'jpeg' | 'webp';

function buildQrData(form: QrFormValues): string {
    switch (form.qrType) {
        case 'wifi': {
            const { ssid, password, security, hidden } = form.wifi;
            return `WIFI:T:${security};S:${ssid};P:${password};H:${hidden ? 'true' : 'false'};;`;
        }
        case 'text': return form.content || ' ';
        case 'url':
        default: return form.content || 'https://example.com';
    }
}

function buildConfig(
    form: QrFormValues,
    croppedImage: string,
    size: number,
    format: DownloadFormat,
    overrideCropped?: string,
): Options {
    // El renderer interno: svg cuando el output es svg, canvas para el resto
    const drawType = format === 'svg' ? 'svg' : 'canvas';
    return {
        width: size,
        height: size,
        type: drawType as Options['type'],
        data: buildQrData(form),
        image: (overrideCropped ?? croppedImage) || undefined,
        margin: form.qrMargin,
        dotsOptions: { type: form.model, color: form.dotsColor },
        backgroundOptions: { color: form.backgroundColor },
        imageOptions: { crossOrigin: 'anonymous', margin: form.imageMargin },
    };
}

export function useQrGenerator() {
    const [form, setForm] = useState<QrFormValues>(QR_DEFAULTS);
    const [dlOptions, setDlOptions] = useState<DownloadOptions>(DOWNLOAD_DEFAULTS);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [generating, setGenerating] = useState(false);
    const [croppedImage, setCroppedImage] = useState<string>('');

    const previewQrRef = useRef<QRCodeStyling | null>(null);
    const downloadQrRef = useRef<QRCodeStyling | null>(null);

    const generateQr = useCallback(async (overrideCropped?: string) => {
        setGenerating(true);

        // Preview: siempre canvas/png 300px
        previewQrRef.current = new QRCodeStyling(
            buildConfig(form, croppedImage, PREVIEW_SIZE, 'png', overrideCropped)
        );

        // Descarga: tamaño y formato elegido
        downloadQrRef.current = new QRCodeStyling(
            buildConfig(form, croppedImage, dlOptions.size, dlOptions.format, overrideCropped)
        );

        setTimeout(async () => {
            try {
                // getRawData sin argumento usa el type del config (canvas → png blob)
                const blob = await previewQrRef.current!.getRawData();
                if (blob instanceof Blob) {
                    setPreviewUrl(prev => {
                        if (prev) URL.revokeObjectURL(prev);
                        return URL.createObjectURL(blob);
                    });
                }
            } finally { setGenerating(false); }
        }, 120);
    }, [form, croppedImage, dlOptions]);

    useEffect(() => { generateQr(); }, [form, dlOptions]);

    const downloadQr = async () => {
        if (!downloadQrRef.current) return;

        if (dlOptions.format === 'svg') {
            // SVG usa download() directamente
            downloadQrRef.current.download({
                name: 'qr-teamcellmania',
                extension: 'svg' as FileExtension,
            });
            return;
        }

        // PNG / JPEG / WebP: getRawData() devuelve el blob con el type del config
        const blob = await downloadQrRef.current.getRawData();
        if (!(blob instanceof Blob)) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qr-teamcellmania-${dlOptions.size}.${dlOptions.format}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const applyImage = (dataUrl: string) => { setCroppedImage(dataUrl); generateQr(dataUrl); };
    const removeImage = () => { setCroppedImage(''); generateQr(''); };

    return {
        form, setForm,
        dlOptions, setDlOptions,
        previewUrl, generating, croppedImage,
        generateQr, downloadQr, applyImage, removeImage,
    };
}