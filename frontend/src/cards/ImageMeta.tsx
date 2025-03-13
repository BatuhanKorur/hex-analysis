import { Card } from '../components/Card'
import { cx } from '../utils'

export function ImageMeta({ className, data }: { className: string, data: unknown }) {
  console.log(data)
  return (
    <Card className={cx([''], className)}>
      <Card.Header title="Image Metadata">
      </Card.Header>
      <Card.Body>
        <p>Todo</p>
      </Card.Body>
    </Card>
  )
}
