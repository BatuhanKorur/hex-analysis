import React from 'react'
import { cx } from '../utils'

interface CardProps {
  children?: React.ReactNode
  props?: React.HTMLAttributes<HTMLDivElement>
  className?: string
}
function CardRoot({ children, className, props }: CardProps) {
  return (
    <div className={cx('border border-zinc-600 rounded-md', className)} {...props}>
      {children}
    </div>
  )
}

function CardHeader({ children, className, props, title, subtext }: CardProps & {
  title?: string
  subtext?: string
}) {
  return (
    <div className={cx('flex justify-between items-center p-4 border-b border-zinc-600', className)} {...props}>
      <div className="flex flex-col space-y-[-2px]">
        <h2 className="text-zinc-50 font-medium leading-6">{ title }</h2>
        <span className="text-zinc-300 text-sm">{ subtext }</span>
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
    <div className={cx('p-4', className)} {...props}>
      {children}
    </div>
  )
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
})
