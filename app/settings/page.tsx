import type { Metadata } from 'next'
import { AppShell } from '@/components/app/app-shell'
import { Avatar } from '@/components/primitives'
import { Camera, ShieldAlert, Key } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Settings — Locus',
}

const nav = [
  { id: 'profile', label: 'Profile' },
  { id: 'workspace', label: 'Workspace' },
  { id: 'billing', label: 'Billing' },
  { id: 'keys', label: 'API Keys' },
]

export default function SettingsPage() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-[1000px] flex-1 px-4 py-8 md:px-8 md:py-12 relative pb-32">
        <header className="mb-12">
          <h1 className="text-[1.8rem] font-semibold tracking-[-0.02em] text-foreground text-balance">
            Settings
          </h1>
        </header>

        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          {/* Sidebar */}
          <aside className="w-full md:w-52 shrink-0">
            <nav className="sticky top-24 flex flex-col gap-1">
              {nav.map((item, i) => (
                <button
                  key={item.id}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-[14px] font-medium transition-all ${
                    i === 0 
                      ? 'bg-foreground text-background shadow-md' 
                      : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 space-y-12 max-w-2xl">
            
            {/* Avatar Section */}
            <section className="flex items-center gap-6">
              <div className="relative group cursor-pointer">
                <div className="size-20 rounded-full bg-gradient-to-tr from-citation to-citation/50 p-0.5">
                  <div className="flex size-full items-center justify-center rounded-full bg-background border-4 border-background overflow-hidden">
                    <Avatar initials="PN" name="Priya Nair" className="size-full rounded-none text-2xl border-none ring-0" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <Camera className="size-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-[16px] font-medium text-foreground">Profile Picture</h3>
                <p className="text-[13.5px] text-muted-foreground mt-1 mb-3">JPG, GIF or PNG. Max size of 5MB.</p>
                <button className="text-[13px] font-medium text-foreground hover:underline underline-offset-4">
                  Remove photo
                </button>
              </div>
            </section>

            {/* General Info */}
            <section className="space-y-6">
              <div>
                <h2 className="text-[18px] font-semibold text-foreground">General</h2>
                <p className="mt-1 text-[14px] text-muted-foreground">Manage your personal details.</p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2 relative">
                  <label className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="Priya" 
                    className="w-full rounded-xl border border-border/80 bg-muted/20 px-4 py-2.5 text-[15px] font-medium text-foreground outline-none transition-all focus:border-citation focus:bg-background focus:ring-4 focus:ring-citation/10"
                  />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="Nair" 
                    className="w-full rounded-xl border border-border/80 bg-muted/20 px-4 py-2.5 text-[15px] font-medium text-foreground outline-none transition-all focus:border-citation focus:bg-background focus:ring-4 focus:ring-citation/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="priya@meridian.dev" 
                  className="w-full rounded-xl border border-border/80 bg-muted/20 px-4 py-2.5 text-[15px] font-medium text-foreground outline-none transition-all focus:border-citation focus:bg-background focus:ring-4 focus:ring-citation/10"
                />
              </div>
            </section>

            {/* Security Section */}
            <section className="space-y-6 pt-6 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Key className="size-5 text-foreground" />
                <h2 className="text-[18px] font-semibold text-foreground">Security</h2>
              </div>
              
              <div className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[14.5px] font-medium text-foreground">Two-Factor Authentication</h4>
                    <p className="text-[13px] text-muted-foreground mt-1">Add an extra layer of security to your account.</p>
                  </div>
                  <button className="rounded-full bg-foreground px-4 py-1.5 text-[13px] font-medium text-background transition-transform hover:scale-105">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="space-y-6 pt-6">
              <div className="flex items-center gap-2">
                <ShieldAlert className="size-5 text-[var(--status-blocker)]" />
                <h2 className="text-[18px] font-semibold text-[var(--status-blocker)]">Danger Zone</h2>
              </div>
              
              <div className="rounded-2xl border border-[var(--status-blocker)]/20 bg-[var(--status-blocker)]/5 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[14.5px] font-medium text-foreground">Delete Account</h4>
                    <p className="text-[13px] text-muted-foreground mt-1">Permanently delete your account and all data.</p>
                  </div>
                  <button className="rounded-lg border border-[var(--status-blocker)]/30 bg-transparent px-4 py-2 text-[13px] font-medium text-[var(--status-blocker)] transition-colors hover:bg-[var(--status-blocker)]/10">
                    Delete Account
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Floating Save Bar (mocked as visible) */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-full border border-border/60 bg-background/80 px-6 py-3 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] backdrop-blur-xl animate-in slide-in-from-bottom-10 md:ml-28">
          <span className="text-[13.5px] font-medium text-foreground">You have unsaved changes</span>
          <div className="flex gap-2">
            <button className="rounded-full px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground">Reset</button>
            <button className="rounded-full bg-citation px-4 py-1.5 text-[13px] font-medium text-white shadow-md transition-transform hover:scale-105 active:scale-95">Save Changes</button>
          </div>
        </div>
      </main>
    </AppShell>
  )
}
