import { Hono } from 'hono'
import { createBunWebSocket } from 'hono/bun'
import { AnalysisService } from './lib/AnalysisService'
import { sendMessage, parseMessage } from '@hex-analysis/shared'

const { upgradeWebSocket, websocket } = createBunWebSocket()
const app = new Hono()

app.get('/', c => c.text('Hello!'))

/* // TODO: Type-check request
app.post('/analyze', async (c) => {
  try {
    const body = await c.req.formData().then(formData => formData.get('file'))
    if (!body) return

    // TODO: Validate is actually a file?
    const analysis = new AnalysisService()
    await analysis.start(body as File)

    return c.json({
      message: 'OK',
    }, 200)
  }
  catch (error) {
    console.error('Error processing file', error)
    return c.json({
      error: 'Failed to process file',
    }, 500)
  }
}) */

app.get('/ws', upgradeWebSocket(() => {
  return {
    onOpen(event, ws) {
      console.log('WebSocket connected')
    },
    onMessage(event, ws) {
      const data = parseMessage(event)
      if (data.type === 'analyze_file') {
        const f = data.message as { file: string, filename: string, content_type: string }
        const binaryData = Buffer.from(f.file, 'base64')
        const file = new File([binaryData], f.filename, {
          type: f.content_type || 'application/octet-stream',
        })

        const analysis = new AnalysisService(ws)
        analysis.startAnalysis(file)
      }
    },
  }
}))

export default {
  fetch: app.fetch,
  websocket,
}
