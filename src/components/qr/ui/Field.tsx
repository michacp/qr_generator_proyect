// src/components/qr/ui/Field.tsx
import type { ReactNode } from 'react';
import { Tooltip } from './Tooltip';
import { Hint } from './Hint';

interface FieldProps {
  label: string;
  tooltip?: string;  // texto del ícono ?
  hint?: string;     // texto de ayuda siempre visible debajo del input
  children: ReactNode;
}

export function Field({ label, tooltip, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      {children}
      {hint && <Hint text={hint} />}
    </div>
  );
}