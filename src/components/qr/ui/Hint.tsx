// src/components/qr/ui/Hint.tsx

interface HintProps {
  text: string;
}

/**
 * Texto de ayuda sutil que se muestra siempre debajo de un campo.
 * Ideal para campos cuyo efecto no es obvio (márgenes, estilo de puntos).
 */
export function Hint({ text }: HintProps) {
  return (
    <p className="text-[11px] text-slate-500 leading-relaxed mt-1 pl-0.5">
      {text}
    </p>
  );
}