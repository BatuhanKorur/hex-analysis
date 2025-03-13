import { useMemo, useRef, useState } from 'react'
import { Card } from '@/components/Card'
import { cx } from '@/utils'
import { useVirtualizer } from '@tanstack/react-virtual'

export function HexStrings({ className, data }: { className: string, data: string[] }) {
  // Query Filtering
  const [query, setQuery] = useState('')
  const filteredData = useMemo(() => {
    if (!query.trim()) return data
    return data.filter(item => item.toLowerCase().includes(query.toLowerCase()))
  }, [data, query])

  // Virtualization
  const containerRef = useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 25,
    overscan: 10,
  })

  return (
    <Card className={cx([''], className)}>
      <Card.Header title="HexStrings" subtext="Strings">
        <input
          type="text"
          value={query}
          className="styled-input"
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for strings..."
        />
      </Card.Header>
      <Card.Body>
        <div
          ref={containerRef}
          className="h-[400px] overflow-y-auto"
          style={{ position: 'relative' }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((vitem) => {
              const line = filteredData[vitem.index]
              return (
                <div
                  key={vitem.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${vitem.size}px`,
                    transform: `translateY(${vitem.start}px)`,
                  }}
                >
                  <p className="text-[15px] tracking-[0.1px] text-zinc-50">{ line }</p>
                </div>
              )
            })}
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="between">
        <p>Found {data.length + 1} strings</p>
        <p>Showing {filteredData.length}</p>
      </Card.Footer>
    </Card>
  )
}
