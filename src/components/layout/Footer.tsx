import { asset } from '../../utils/asset'
export function Footer() {
  return (
    <footer id="pied-de-page" className="bg-navy text-white">
      <div className="container-tc py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <img
              src={asset("/assets/logo.svg")}
              alt="TransCure bioServices"
              className="h-10 brightness-0 invert"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Humanized Research
            </p>
            <p className="mt-2 text-sm text-white/50">
              Designed, performed and analyzed in France,
              <br />
              European Union.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#contact" className="text-white/70 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-white/70 hover:text-white">
                    Legal and privacy information
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white">
                    Cookie settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>©2025 - 2026 TransCure bioServices</p>
          <p>
            Website created by{' '}
            <a href="#" className="text-white/70 underline hover:text-white">
              Adveris
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
