// src/components/qr/ui/GuidedTour.tsx
import { useState, useEffect } from 'react';
import type { Translations } from '../types';

const STORAGE_KEY = 'qr_tour_done';

interface GuidedTourProps {
  t: Translations;
}

export function GuidedTour({ t }: GuidedTourProps) {
  const [visible, setVisible] = useState(false);
  const [step, setStep]       = useState(0);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const steps = t.tour.steps;
  const current = steps[step];

  const next = () => step < steps.length - 1 ? setStep(s => s + 1) : finish();
  const prev = () => setStep(s => Math.max(0, s - 1));
  const finish = () => { localStorage.setItem(STORAGE_KEY, '1'); setVisible(false); };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[#13131a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-up">

        {/* barra de progreso */}
        <div className="h-1 bg-white/5">
          <div
            className="h-full bg-violet-500 transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="p-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-4xl">{current.emoji}</span>
            <span className="text-xs text-slate-500 font-medium">
              {t.tour.step_counter.replace('{current}', String(step + 1)).replace('{total}', String(steps.length))}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-display font-bold text-white">{current.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{current.description}</p>
          </div>

          {/* dots */}
          <div className="flex gap-1.5 justify-center pt-1">
            {steps.map((_, i) => (
              <button key={i} onClick={() => setStep(i)}
                className={`h-2 rounded-full transition-all ${i === step ? 'bg-violet-500 w-4' : 'bg-white/20 hover:bg-white/40 w-2'}`}
              />
            ))}
          </div>

          <div className="flex gap-3 pt-1">
            {step > 0 && (
              <button onClick={prev}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-semibold transition active:scale-95">
                {t.tour.btn_prev}
              </button>
            )}
            <button onClick={next}
              className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition active:scale-95">
              {step < steps.length - 1 ? t.tour.btn_next : t.tour.btn_finish}
            </button>
          </div>

          {step < steps.length - 1 && (
            <button onClick={finish}
              className="w-full text-center text-xs text-slate-600 hover:text-slate-400 transition py-1">
              {t.tour.btn_skip}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}