function App() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f5f0e8_0%,#efe7da_28%,#e7dfd2_48%,#ddd4c8_100%)] text-stone-900">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 lg:px-10">
        <div className="rounded-[2rem] border border-black/10 bg-white/75 p-6 shadow-[0_24px_80px_rgba(36,29,20,0.12)] backdrop-blur md:p-8">
          <div className="mb-10 flex flex-col gap-6 border-b border-stone-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-[0.24em] text-stone-500 uppercase">
                Unboxers Assignment
              </p>
              <div className="space-y-3">
                <h1 className="font-['SUIT',_'Pretendard',_system-ui,_sans-serif] text-4xl font-extrabold tracking-tight text-stone-950 md:text-6xl">
                  Mock Exam Client
                </h1>
                <p className="max-w-2xl text-base leading-7 text-stone-600 md:text-lg">
                  Tailwind CSS v4, TanStack Query, React Hook Form, Zod, React Compiler baseline
                  setup is ready.
                </p>
              </div>
            </div>

            <div className="grid gap-3 text-sm text-stone-700 sm:grid-cols-2">
              <StatusChip label="React Compiler" value="Enabled" />
              <StatusChip label="Styling" value="Tailwind v4" />
              <StatusChip label="Server State" value="React Query" />
              <StatusChip label="Validation" value="RHF + Zod" />
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[1.5rem] bg-stone-950 p-6 text-stone-50 md:p-8">
              <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-stone-400 uppercase">
                Next Step
              </p>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Figma 기준으로 시험 흐름을 바로 구현하면 됩니다.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-300 md:text-base">
                현재 클라이언트는 전역 스타일, QueryClientProvider, React Compiler, 최신 React Hooks
                lint preset까지 연결된 상태입니다.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-6">
              <p className="text-xs font-semibold tracking-[0.22em] text-stone-500 uppercase">
                Suggested Structure
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
                <li>`src/features/exam` for tutorial, OMR, result screens</li>
                <li>`src/shared/ui` for reusable touch-friendly components</li>
                <li>`src/shared/api` for exam fetch and submit clients</li>
                <li>`src/shared/lib` for form schema and utilities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

type StatusChipProps = {
  label: string;
  value: string;
};

function StatusChip({ label, value }: StatusChipProps) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3">
      <p className="text-xs font-semibold tracking-[0.18em] text-stone-500 uppercase">{label}</p>
      <p className="mt-2 text-base font-semibold text-stone-900">{value}</p>
    </div>
  );
}

export default App;
