// src/components/qr/WifiForm.tsx
import { useState } from 'react';
import type { WifiValues, Translations } from './types';
import { Field } from './ui/Field';

interface WifiFormProps {
  wifi: WifiValues;
  t: Translations;
  onChange: (patch: Partial<WifiValues>) => void;
}

export function WifiForm({ wifi, t, onChange }: WifiFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputClass =
    'w-full bg-[#1c1c26] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition';

  return (
    <div className="space-y-4">

      {/* SSID */}
      <Field label={t.wifi.ssid_label} tooltip={t.wifi.ssid_tooltip} hint={t.wifi.ssid_hint}>
        <input
          type="text"
          value={wifi.ssid}
          onChange={e => onChange({ ssid: e.target.value })}
          placeholder={t.wifi.ssid_placeholder}
          className={inputClass}
          autoComplete="off"
        />
      </Field>

      {/* Contraseña */}
      <Field label={t.wifi.password_label} tooltip={t.wifi.password_tooltip} hint={t.wifi.password_hint}>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={wifi.password}
            onChange={e => onChange({ password: e.target.value })}
            placeholder={t.wifi.password_placeholder}
            className={`${inputClass} pr-10`}
            autoComplete="off"
          />
          {/* toggle ver contraseña */}
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400 transition"
            tabIndex={-1}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tipo de seguridad */}
        <Field label={t.wifi.security_label} tooltip={t.wifi.security_tooltip} hint={t.wifi.security_hint}>
          <select
            value={wifi.security}
            onChange={e => onChange({ security: e.target.value as WifiValues['security'] })}
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="WPA">{t.wifi.security_wpa}</option>
            <option value="WEP">{t.wifi.security_wep}</option>
            <option value="nopass">{t.wifi.security_none}</option>
          </select>
        </Field>

        {/* Red oculta */}
        <Field label={t.wifi.hidden_label} tooltip={t.wifi.hidden_tooltip} hint={t.wifi.hidden_hint}>
          <div className="flex items-center h-[42px]">
            <button
              type="button"
              role="switch"
              aria-checked={wifi.hidden}
              onClick={() => onChange({ hidden: !wifi.hidden })}
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent
                transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500
                ${wifi.hidden ? 'bg-violet-600' : 'bg-white/10'}
              `}
            >
              <span className={`
                inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200
                ${wifi.hidden ? 'translate-x-5' : 'translate-x-0'}
              `} />
            </button>
            <span className="ml-3 text-xs text-slate-400">
              {wifi.hidden ? '✓ Oculta' : 'Visible'}
            </span>
          </div>
        </Field>
      </div>

      {/* preview del string generado */}
      {wifi.ssid && (
        <div className="bg-[#1c1c26] border border-white/10 rounded-xl px-4 py-3">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">
            String QR generado
          </p>
          <p className="text-xs font-mono text-violet-300 break-all">
            WIFI:T:{wifi.security};S:{wifi.ssid};P:{wifi.password || '···'};H:{wifi.hidden ? 'true' : 'false'};;
          </p>
        </div>
      )}
    </div>
  );
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}