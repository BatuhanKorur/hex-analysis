import { Card } from '@/components/Card'
import { FileVerificationResponse } from '../../../shared'
import { cx } from '../utils'
import { VERIFICATION_STATUS } from '@hex-analysis/shared/enum'

function VerifyBadge({ status }: { status: FileVerificationResponse['status'] }) {
  return (
    <div className="bg-zinc-800 w-28 rounded-full h-8 center px-4">
      <p className={cx([
        'text-white text-sm font-medium',
        status === VERIFICATION_STATUS.MATCH ? 'text-emerald-400' : 'text-rose-300',
      ])}
      >{ status }
      </p>
    </div>
  )
}

function Description({ title, value }: { title: string, value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col items-start">
        <h3 className="text-sm text-zinc-400/80">{ title }</h3>
        <p className="text-base font-medium text-zinc-300">{ value }</p>
      </div>
    </div>
  )
}
export default function FileVerificationCard({ results, className }: { results: FileVerificationResponse, className?: string }) {
  console.log(results)
  return (
    <Card className={className}>
      <Card.Header title="File Verification" subtext={results.message}>
        <VerifyBadge status={results.status} />
      </Card.Header>
      {results.status !== VERIFICATION_STATUS.UNKNOWN && (
        <Card.Body className="grid grid-cols-2 p-0 px-6 py-3 gap-y-1 gap-x-3">
          <Description title="Actual MIME Type" value={results.verified_mime} />
          <Description title="Claimed MIME Type" value={results.claimed_mime} />
          <Description title="Extension" value={results.signature?.extension || 'unknown'} />
          <Description title="Description" value={results.signature?.description || 'unknown'} />
          <div className="flex items-center justify-between py-2 col-span-2">
            <div className="flex flex-col items-start">
              <h3 className="text-sm text-zinc-400/80">Signature</h3>
              <div className="text-base font-medium text-zinc-300 border grid grid-cols-10">
                {results.signature?.signature?.map((byte, index) => (
                  <span className="border px-2" key={index}>{byte}</span>
                ))}
              </div>
            </div>
          </div>
          <Description title="Is Image" value={results.isImage ? 'Yes' : 'No'} />
          <Description title="Is Executable" value={results.isExecutable ? 'Yes' : 'No'} />
          <Description title="Is Archive" value={results.isArchive ? 'Yes' : 'No'} />
          <Description title="Is Document" value={results.isDocument ? 'Yes' : 'No'} />
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
