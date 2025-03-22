import { FileVerificationResponse } from '@hex-analysis/shared'
import { VERIFICATION_STATUS } from '@hex-analysis/shared/enum'
import { Card, Description } from '@/components'
import { cx } from '@/utils'
import {Badge} from "../components";


export default function FileVerification({ results, className }: { results: FileVerificationResponse, className?: string }) {
  const badgeColor = results.status === VERIFICATION_STATUS.MATCH ? 'text-emerald-400' : 'text-rose-500'
  return (
    <Card className={className}>
      <Card.Header title="File Verification" subtext={results.message}>
        <Badge>
          <p className={cx(badgeColor, 'font-medium')}>{ results.status }</p>
        </Badge>
      </Card.Header>
      {results.status !== VERIFICATION_STATUS.UNKNOWN && (
        <Card.Body className="grid grid-cols-4 p-0 px-6 py-3 gap-y-1 gap-x-3">
          <Description title="Actual MIME Type" value={results.verified_mime} />
          <Description title="Claimed MIME Type" value={results.claimed_mime} />
          <Description title="Extension" value={results.signature?.extension || 'unknown'} />
          <Description title="Description" value={results.signature?.description || 'unknown'} />
          <Description title="Is Image" value={results.isImage ? 'Yes' : 'No'} />
          <Description title="Is Executable" value={results.isExecutable ? 'Yes' : 'No'} />
          <Description title="Is Archive" value={results.isArchive ? 'Yes' : 'No'} />
          <Description title="Is Document" value={results.isDocument ? 'Yes' : 'No'} />
          <div className="between col-span-2">
            <div className="flex flex-col items-start">
              <h3 className="text-sm text-zinc-400/80">Signature</h3>
              <div className="grid grid-cols-10 gap-x-2 bg-zinc-800 border border-zinc-700 rounded-md divide-x divide-zinc-700">
                {results.signature?.signature?.map((byte, index) => (
                    <div className="w-14 center py-1">
                      <span className="text-sm font-mono" key={index}>{byte}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </Card.Body>

      )}
      {results.status === VERIFICATION_STATUS.UNKNOWN && (
        <Card.Body className="p-6 h-30 center">
          <p className="italic text-gray-200">Unknown</p>
        </Card.Body>
      )}
    </Card>
  )
}
