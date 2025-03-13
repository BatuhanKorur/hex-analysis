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
export default function FileVerificationCard({ results, className }: { results: FileVerificationResponse, className?: string }) {
  console.log(results)
  return (
    <Card className={className}>
      <Card.Header title="File Verification" subtext="Hello World">
        <VerifyBadge status={results.status} />
      </Card.Header>
      <Card.Body>
        <h2>File Verification Results</h2>
      </Card.Body>
    </Card>
  )
}
