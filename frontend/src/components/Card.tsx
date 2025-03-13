import React from 'react'
import { cx } from '../utils'

interface CardProps {
  children?: React.ReactNode
  props?: React.HTMLAttributes<HTMLDivElement>
  className?: string
}
function CardRoot({ children, className, props }: CardProps) {
  return (
    <div className={cx('border border-zinc-700 rounded-md', className)} {...props}>
      {children}
    </div>
  )
}

function CardHeader({ children, className, props, title, subtext }: CardProps & {
  title?: string
  subtext?: string
}) {
  return (
    <div className={cx('flex justify-between items-center p-4 border-b border-zinc-700', className)} {...props}>
      <div className="flex flex-col items-start">
        <h2 className="text-zinc-50 font-medium leading-6 text-[15px] tracking-[0.15px]">{ title }</h2>
        <span className="text-zinc-300 text-[14px] tracking-[0.1px] leading-4">{ subtext }</span>
      </div>
      {children}
    </div>
  )
}

function CardBody({ children, className, props }: CardProps) {
  return (
    <div className={cx('p-4', className)} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ children, className, props }: CardProps) {
  return (
    <div className={cx('px-4 py-3 border-t border-zinc-700 text-sm text-zinc-100 tracking-[0.1px]', className)} {...props}>
      {children}
    </div>
  )
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
})
