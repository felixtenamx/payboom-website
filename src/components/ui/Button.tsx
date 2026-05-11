import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'ghost'
type ButtonSize = 'default' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

type ButtonAsButton = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type ButtonAsLink = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

type ButtonProps = ButtonAsButton | ButtonAsLink

export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'default', children, ...rest } = props

  const baseClasses = 'inline-flex items-center gap-2 rounded-full font-medium text-[15px] tracking-tight transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap border border-transparent'
  const sizeClasses = size === 'lg' ? 'px-7 py-4 text-base' : 'px-5 py-3'

  const variantClasses = variant === 'primary'
    ? 'btn-grad text-white font-semibold'
    : 'btn-glass'

  const className = `${baseClasses} ${sizeClasses} ${variantClasses}`

  if (props.as === 'a') {
    const { as: _, ...anchorProps } = props as ButtonAsLink
    return <a {...anchorProps} className={className} />
  }

  const { as: _, type = 'button', ...buttonProps } = props as ButtonAsButton
  return <button type={type} {...buttonProps} className={className} />
}