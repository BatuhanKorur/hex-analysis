export function socketResponse(type: string, message: unknown): string {
  return JSON.stringify({ type, message })
}

export function socketData(event: MessageEvent) {
  return JSON.parse(event.data) as { type: string, message: unknown }
}
