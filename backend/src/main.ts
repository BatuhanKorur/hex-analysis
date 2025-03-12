import { Hono } from 'hono'
import { AnalysisService } from './lib/AnalysisService'

const app = new Hono()

app.get('/', c => c.text('Hello!'))

// TODO: Type-check request
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
})

export default {
  fetch: app.fetch,
}
