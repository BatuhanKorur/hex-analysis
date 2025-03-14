import { SOCKET_STATUS } from '@hex-analysis/shared/enum'
import { cva, cx } from '../utils'

export function SocketStatus({ status }: { status: SOCKET_STATUS }) {
  const statusClass = cva({
    base: ['size-3 rounded-full'],
    variants: {
      status: {
        [SOCKET_STATUS.CONNECTING]: 'bg-emerald-300',
        [SOCKET_STATUS.CONNECTED]: 'bg-emerald-500',
        [SOCKET_STATUS.DISCONNECTED]: 'bg-rose-300',
        [SOCKET_STATUS.ERROR]: 'bg-red-500',
      },
    },
    defaultVariants: {
      status: SOCKET_STATUS.DISCONNECTED,
    },
  })
  return (
    <div className="inline-flex items-center space-x-2 bg-zinc-900 pl-3.5 pr-4 py-1 rounded-md border border-zinc-800">
      <div className={cx(statusClass({ status }))}></div>
      <span className="text-[15px] leading-7 text-zinc-100">{ status }</span>
    </div>
  )
}
