import type { ReactElement } from 'react'
import { cn } from '../../lib/utils'

type BaseProps = {
  className?: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

type AnchorButtonProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as?: 'a' }

type NativeButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' }

export function Button(props: AnchorButtonProps): ReactElement
export function Button(props: NativeButtonProps): ReactElement
export function Button({
  className,
  variant = 'primary',
  size = 'md',
  as = 'a',
  children,
  ...props
}: AnchorButtonProps | NativeButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple',
    {
      'bg-purple text-white hover:bg-purple-dark': variant === 'primary',
      'border border-navy/15 bg-white text-navy hover:border-purple hover:text-purple':
        variant === 'outline',
      'bg-transparent text-navy hover:text-purple': variant === 'ghost',
      'px-5 py-2.5 text-sm rounded-[var(--radius-pill)]': size === 'sm',
      'px-7 py-3.5 text-base rounded-[var(--radius-pill)]': size === 'md',
      'px-9 py-4 text-lg rounded-[var(--radius-pill)]': size === 'lg',
    },
    className,
  )

  if (as === 'button') {
    const buttonProps = props as NativeButtonProps
    return (
      <button type="button" className={classes} {...buttonProps}>
        {children}
      </button>
    )
  }

  const anchorProps = props as AnchorButtonProps
  return (
    <a className={classes} {...anchorProps}>
      {children}
    </a>
  )
}
