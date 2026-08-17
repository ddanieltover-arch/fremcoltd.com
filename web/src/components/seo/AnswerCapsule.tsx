interface AnswerCapsuleProps {
  children: React.ReactNode;
}

export function AnswerCapsule({ children }: AnswerCapsuleProps) {
  return (
    <section id="answer" aria-label="Quick Answer" className="mb-8 rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">Quick Answer</p>
      <p className="mt-2 leading-relaxed text-slate-700">{children}</p>
    </section>
  );
}
