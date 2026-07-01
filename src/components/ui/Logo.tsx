export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="/" className={`inline-block ${className}`} aria-label="TransCure bioServices">
      <img
        src="/assets/logo.svg"
        alt="TransCure bioServices"
        className="h-8 w-auto md:h-10"
      />
    </a>
  )
}
