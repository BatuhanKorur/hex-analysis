import { Card } from '../components/Card'
import { HexLine } from '@hex-analysis/shared'
import { useVirtualizer } from '@tanstack/react-virtual'
import React from 'react'
import HexRow from '../components/HexRow.tsx'

export function HexDump({ className, data }: {
  className: string
  data: HexLine[]
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 30,
    overscan: 10,
  })

  return (
    <Card className={className}>
      <Card.Header title="Hex Analysis">
        <button>Reset</button>
      </Card.Header>
      <Card.Body className="p-0">
        <div
          ref={containerRef}
          className="h-[440px] overflow-y-auto"
          style={{ position: 'relative' }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const line = data[virtualRow.index]
              return (
                <div
                  key={`line-${virtualRow.index}`}
                  className="absolute w-full px-2.5"
                  style={{
                    top: 0,
                    left: 0,
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <HexRow data={line} />
                </div>
              )
            })}
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <p>Total Lines: {data.length}</p>
      </Card.Footer>
    </Card>
  )
}
