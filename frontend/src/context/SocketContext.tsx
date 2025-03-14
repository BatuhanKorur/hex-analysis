import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { SOCKET_STATUS } from '@hex-analysis/shared/enum'

interface SocketContextType {
  socket: WebSocket | null
  isConnected: boolean
  status: SOCKET_STATUS
  send: (type: string, message: unknown) => void
  messages: Map<string, unknown>
}

const WebSocketContext = createContext<SocketContextType>({
  socket: null,
  status: SOCKET_STATUS.DISCONNECTED,
  isConnected: false,
  send: () => {},
  messages: new Map<string, unknown>(),
})

export const useSocket = () => useContext(WebSocketContext)

export const SocketContext: FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [status, setStatus] = useState<SOCKET_STATUS>(SOCKET_STATUS.DISCONNECTED)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<Map<string, unknown>>(new Map())

  const send = (type: string, message: unknown) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify({ type, message }))
    }
  }

  const connectWebSocket = () => {
    try {
      if (socket) {
        socket.close()
      }

      setStatus(SOCKET_STATUS.CONNECTING)
      const ws = new WebSocket('ws://localhost:3000/ws')

      ws.onopen = () => {
        setIsConnected(true)
        setStatus(SOCKET_STATUS.CONNECTED)
      }

      ws.onclose = () => {
        setIsConnected(false)
        setStatus(SOCKET_STATUS.DISCONNECTED)
      }

      ws.onerror = () => {
        setIsConnected(false)
        setStatus(SOCKET_STATUS.DISCONNECTED)
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          setMessages((prev) => {
            const newMap = new Map(prev)
            newMap.set(data.type, data.message)
            return newMap
          })
        }
        catch (error) {
          console.error('Invalid JSON message received:', event.data, error)
        }
      }
      setSocket(ws)
    }
    catch (e) {
      console.error('WebSocket error', e)
    }
  }

  useEffect(() => {
    connectWebSocket()
    return () => {
      if (socket) {
        socket.close()
        setSocket(null)
        setIsConnected(false)
        setStatus(SOCKET_STATUS.DISCONNECTED)
      }
    }
  }, [])

  return (
    <WebSocketContext.Provider value={{
      socket,
      status,
      messages,
      send,
      isConnected,
    }}
    >
      {children}
    </WebSocketContext.Provider>
  )
}
