import { defineConfig } from 'cva'
import { twMerge } from 'tailwind-merge'

export const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: className => twMerge(className),
  },
})

export function formatHexValue(content: string, isHex: boolean): { newHex: string, newAscii: string } {
  if (isHex) {
    const newHex = content.padStart(2, '0').slice(-2).toUpperCase()
    const newAscii = String.fromCharCode(parseInt(newHex, 16))
    return { newHex, newAscii }
  }
  else {
    const newAscii = content.charAt(0)
    const newHex = newAscii.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')
    return { newHex, newAscii }
  }
}
