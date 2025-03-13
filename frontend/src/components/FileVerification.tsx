import { Card } from '@/components/Card'
import { VerifyFileResponse } from '@hex-analysis/types'

export default function FileVerification({ results }: { results: VerifyFileResponse }) {
  console.log(results)
  return (
    <Card>
      <Card.Header title="File Verification" subtext="Hello World">
      </Card.Header>
      <Card.Body>
        <h2>File Verification Results</h2>
      </Card.Body>
    </Card>
  )
}
