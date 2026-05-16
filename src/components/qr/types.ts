// src/components/qr/types.ts
import type { DotType } from 'qr-code-styling';
import type { Translations } from '../../i18n';

export type QrType = 'url' | 'text' | 'wifi';

export type DownloadFormat = 'png' | 'svg' | 'jpeg' | 'webp';

export interface DownloadSize {
    label: string;   // e.g. "256×256"
    value: number;   // px
    hint: string;   // uso recomendado
}

export interface DownloadOptions {
    format: DownloadFormat;
    size: number;
}

export const DOWNLOAD_FORMATS: DownloadFormat[] = ['png', 'svg', 'jpeg', 'webp'];

export const DOWNLOAD_SIZES: DownloadSize[] = [
    { label: '256×256', value: 256, hint: 'Web / apps' },
    { label: '512×512', value: 512, hint: 'Redes sociales' },
    { label: '1024×1024', value: 1024, hint: 'Impresión pequeña' },
    { label: '2048×2048', value: 2048, hint: 'Carteles / impresión' },
];

export const DOWNLOAD_DEFAULTS: DownloadOptions = {
    format: 'png',
    size: 512,
};

export interface WifiValues {
    ssid: string;
    password: string;
    security: 'WPA' | 'WEP' | 'nopass';
    hidden: boolean;
}

export interface QrFormValues {
    qrType: QrType;
    content: string;
    wifi: WifiValues;
    model: DotType;
    dotsColor: string;
    backgroundColor: string;
    qrMargin: number;
    imageMargin: number;
}

export const QR_DEFAULTS: QrFormValues = {
    qrType: 'url',
    content: 'https://example.com',
    wifi: { ssid: '', password: '', security: 'WPA', hidden: false },
    model: 'square',
    dotsColor: '#000000',       // negro
    backgroundColor: '#FFFFFF', // blanco
    qrMargin: 10,
    imageMargin: 10,
};

export type { Translations, DotType };