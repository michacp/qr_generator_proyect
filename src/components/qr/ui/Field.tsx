// src/components/qr/ui/Field.tsx
import type { ReactNode } from 'react';
import { Tooltip } from './Tooltip';
import { Hint }    from './Hint';

interface FieldProps {
  label:    string;
  tooltip?: string;
  hint?:    string;
  children: ReactNode;
}

/**
 * Wrapper de campo con label + tooltip opcional + hint opcional.
 * Usa flex-col con justify-between para que cuando el padre use
 * items-end (alineación de inputs en fila), el input siempre quede
 * en la misma altura independientemente de cuántas líneas tenga el label.
 */
export function Field({ label, tooltip, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {/* label + ícono de ayuda */}
      <div className="flex items-start gap-1.5 min-h-[2rem]">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider leading-tight">
          {label}
        </label>
        {tooltip && <span className="flex-shrink-0 mt-px"><Tooltip text={tooltip} /></span>}
      </div>
      {/* input */}
      {children} 
       
    </div>
  );
}