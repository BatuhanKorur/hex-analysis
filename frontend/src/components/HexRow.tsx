import { HexLine } from '@hex-analysis/shared'
import { useState } from 'react'
import { cx, formatHexValue } from '../utils'

export default function HexRow({ data, onValueChange }: {
  data: HexLine
  onValueChange?: (address: string, index: number, hexValue: string, asciiValue: string) => void
}) {
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [hexValues, setHexValues] = useState<string[]>([...data.hex])
  const [asciiValues, setAsciiValues] = useState<string[]>([...data.ascii])
  const [changedIndices, setChangedIndices] = useState<Set<number>>(new Set())

  const updateValueAtIndex = (index: number, newHex: string, newAscii: string) => {
    setHexValues((prev) => {
      const updated = [...prev]
      updated[index] = newHex
      return updated
    })

    setAsciiValues((prev) => {
      const updated = [...prev]
      updated[index] = newAscii
      return updated
    })

    setChangedIndices((prev) => {
      const updated = new Set(prev)
      if (newHex !== data.hex[index] || newAscii !== data.ascii[index]) {
        updated.add(index)
      }
      else {
        updated.delete(index)
      }
      return updated
    })

    if (onValueChange) {
      onValueChange(data.address, index, newHex, newAscii)
    }
  }

  const handleHexChange = (index: number, newValue: string) => {
    try {
      const { newHex, newAscii } = formatHexValue(newValue, true)
      updateValueAtIndex(index, newHex, newAscii)
    }
    catch (error) {
      console.error('Error converting hex value:', error)
    }
  }

  const handleAsciiChange = (index: number, newValue: string) => {
    // Take only the first character if multiple are entered
    const char = newValue.charAt(0)
    try {
      // Convert ASCII to hex
      const hexValue = char?.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase() || ''
      updateValueAtIndex(index, hexValue, char)
    }
    catch (error) {
      console.error('Error converting ASCII value:', error)
    }
  }

  /*  const resetValues = () => {
    setHexValues([...data.hex])
    setAsciiValues([...data.ascii])
    setChangedIndices(new Set())
  } */
  return (
    <div className="grid grid-cols-24 w-full gap-x-6">
      <div className="col-span-3 align font-mono text-sm tracking-[1.5px]">
        { data.address }
      </div>
      <div className="col-span-14 grid grid-cols-16 gap-1">
        {hexValues.map((byte, index) => (
          <input
            key={`hex-${index}`}
            type="text"
            value={byte}
            className={cx(
              'w-full h-7 text-center font-mono text-sm outline-none border border-transparent focus:border-indigo-400/50',
              hoveredIndex === index && 'bg-zinc-800',
              changedIndices.has(index) && 'text-indigo-300',
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            onChange={e => handleHexChange(index, e.target.value)}
          />
        ))}
      </div>

      <div className="col-span-7 grid grid-cols-16 gap-1">
        {asciiValues.map((char, index) => (
          <input
            key={`ascii-${index}`}
            type="text"
            maxLength={1}
            value={char}
            className={cx(
              'w-full text-center font-mono text-sm outline-none border border-transparent focus:border-indigo-400/50',
              hoveredIndex === index && 'bg-zinc-800',
              changedIndices.has(index) && 'text-indigo-300',
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            onChange={e => handleAsciiChange(index, e.target.value)}
          />
        ))}
      </div>
    </div>
  )
}
