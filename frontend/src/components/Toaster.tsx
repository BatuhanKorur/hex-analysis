import { Toaster as Sonner } from 'sonner'
import { ComponentProps } from 'react'

type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      toastOptions={{
        style: {
          background: 'var(--color-zinc-900)',
          color: 'var(--color-zinc-300)',
          borderColor: 'var(--color-zinc-800)',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
