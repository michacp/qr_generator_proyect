// src/components/qr/ui/ColorPicker.tsx

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-2 bg-[#1c1c26] border border-white/10 rounded-xl px-3 py-2">
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-8 h-8 rounded-lg flex-shrink-0 cursor-pointer"
      />
      <span className="text-xs text-slate-500 font-mono truncate">{value}</span>
    </div>
  );
}