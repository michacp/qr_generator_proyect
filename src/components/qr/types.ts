// src/components/qr/types.ts
import type { DotType } from 'qr-code-styling';
import type { Translations } from '../../i18n';

export interface QrFormValues {
    content: string;
    model: DotType;
    dotsColor: string;
    backgroundColor: string;
    qrMargin: number;
    imageMargin: number;
}

export const QR_DEFAULTS: QrFormValues = {
    content: 'https://example.com',
    model: 'square',
    dotsColor: '#000000',        // Negro para los puntos
    backgroundColor: '#ffffff',  // Blanco para el fondo
    qrMargin: 10,
    imageMargin: 10,
};

// Re-exportamos para que los componentes importen desde un solo lugar
export type { Translations };
export type { DotType };