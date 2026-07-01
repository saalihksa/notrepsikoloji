import { useState } from 'react'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'
import { navItems } from '../../data/content'

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header id="en-tete" className="sticky top-0 z-50 border-b border-navy/5 bg-bg/90 backdrop-blur-xl">
      <div className="container-tc flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-purple-light/60 hover:text-purple"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  type="button"
                  className="rounded-full px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-purple-light/60 hover:text-purple"
                >
                  {item.label}
                </button>
              )}

              {item.children && openMenu === item.label && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="min-w-[280px] rounded-[var(--radius-card)] border border-navy/5 bg-white p-4 shadow-xl shadow-purple/10">
                    {item.children.map((child) => (
                      <div key={child.label} className="mb-3 last:mb-0">
                        <a
                          href={child.href ?? '#'}
                          className="block rounded-xl px-3 py-2 text-sm font-semibold text-navy hover:bg-purple-light/50 hover:text-purple"
                        >
                          {child.label}
                        </a>
                        {child.items && (
                          <ul className="ml-3 mt-1 space-y-0.5 border-l border-purple-light pl-3">
                            {child.items.map((sub) => (
                              <li key={sub.label}>
                                <a
                                  href={sub.href}
                                  className="block py-1 text-xs text-muted hover:text-purple"
                                >
                                  {sub.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="ml-2 flex items-center gap-2 border-l border-navy/10 pl-4">
            <button
              type="button"
              className="rounded-full bg-purple px-3 py-1 text-xs font-bold text-white"
            >
              EN
            </button>
            <button type="button" className="rounded-full px-3 py-1 text-xs font-medium text-muted">
              FR
            </button>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Button href="#contact" size="sm" className="hidden sm:inline-flex">
            Contact
          </Button>
          <button
            type="button"
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white xl:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M0 1H20M0 7H20M0 13H20" stroke="#162447" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-navy/5 bg-white px-6 py-6 xl:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href ?? '#'}
                className="rounded-xl px-3 py-3 text-base font-medium text-navy hover:bg-purple-light/40"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button href="#contact" className="mt-4 w-full justify-center">
              Contact
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
