// src/components/qr/ui/Row.tsx
import type { ReactNode } from 'react';

interface RowProps {
  label: string;
  children: ReactNode;
}

export function Row({ label, children }: RowProps) {
  return (
    <p className="flex items-center justify-between gap-2">
      <span className="font-medium text-slate-400">{label}</span>
      <span className="text-slate-300">{children}</span>
    </p>
  );
}