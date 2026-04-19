import { Outlet } from 'react-router-dom'
import { AppHeader } from '../components/AppHeader'
import { FAQSection } from '../components/FAQSection'
import { SiteFooter } from '../components/SiteFooter'

export function RootLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_90%_55%_at_50%_-18%,theme(colors.emerald.500/14),transparent)] dark:bg-[radial-gradient(ellipse_90%_55%_at_50%_-18%,theme(colors.emerald.400/12),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,theme(colors.slate.200/0.55)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.200/0.55)_1px,transparent_1px)] bg-size-[48px_48px] dark:bg-[linear-gradient(to_right,theme(colors.slate-800/0.35)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate-800/0.35)_1px,transparent_1px)]"
        aria-hidden
      />

      <AppHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <Outlet />
      </main>

      <FAQSection />

      <SiteFooter />
    </div>
  )
}
