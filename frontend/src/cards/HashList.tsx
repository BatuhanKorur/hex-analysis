import { Card } from '../components/Card'
import { cx } from '../utils'
import { HashListItem } from '@hex-analysis/shared'
import { Icon } from '@iconify-icon/react'
import { toast } from 'sonner'

export function HashList({ className, data }: { className: string, data: HashListItem[] }) {
  function handleCopy(hash: string) {
    navigator.clipboard.writeText(hash).then(() => {
      toast.success('Hash copied to clipboard')
    })
  }
  return (
    <Card className={cx([''], className)}>
      <Card.Header title="Hash List"></Card.Header>
      <Card.Body className="p-0">
        {data.map((item, index) => (
          <div key={index} className="flex">
            <div className="min-w-28 flex h-11 align">
              <button
                onClick={() => handleCopy(item.hash)}
                className="w-9 cursor-pointer center opacity-25 transition duration-200 ease-in-out hover:opacity-80"
              >
                <Icon icon="material-symbols:content-copy-outline" className="stroke-[1.2]" />
              </button>
              <span className="font-mono text-[15px] text-emerald-200">{item.algorithm}</span>
            </div>
            <div className="col-span-16 align overflow-y-auto px-4">
              <span className="font-mono text-[15px] text-zinc-200">{item.hash}</span>
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  )
}
