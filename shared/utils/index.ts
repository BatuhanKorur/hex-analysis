import { WSMessage } from '../types'

export function sendMessage(type: string, message: unknown) {
  return JSON.stringify({ type, message })
}

export function parseMessage(event: MessageEvent): WSMessage {
  return JSON.parse(event.data) as WSMessage
}
