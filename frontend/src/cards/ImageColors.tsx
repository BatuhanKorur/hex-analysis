import { ColorAnalysisItem } from '@hex-analysis/shared'
import { Card } from '../components/Card'
import { cx } from 'cva'

export function ImageColors({ className, data }: { className: string, data: ColorAnalysisItem[] }) {
  return (
    <Card className={cx([''], className)}>
      <Card.Header title="Image Colors">
      </Card.Header>
      <Card.Body className="grid grid-cols-5 gap-2">
        {data.map((color, index) => (
          <div key={index} className="border border-zinc-800 p-1 rounded-lg">
            <div
              className="h-24 rounded-md"
              style={{
                backgroundColor: color.color,
              }}
            >
            </div>
            <div className="between text-sm text-zinc-300 px-2 pt-2 pb-1">
              <span>{ color.color }</span>
              <span>{color.percentage}%</span>
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  )
}
