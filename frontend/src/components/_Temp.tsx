import { Card } from './Card'
import { cx } from '../utils'

export function _Temp({ className, data }: { className: string, data: unknown }) {
  console.log(data)
  return (
    <Card className={cx([''], className)}>
      <Card.Header title="Hash List">
      </Card.Header>
      <Card.Body>
        <p>Todo</p>
      </Card.Body>
    </Card>
  )
}
