import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

export function useChatSocket(token: string | null) {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!token) {
      if (socketRef.current) {
        console.log('No token, disconnecting...')
        socketRef.current.disconnect()
        socketRef.current = null
      }
      return
    }

    if (socketRef.current) {
      return
    }
    const newSocket = io('http://localhost:3000/chat', {
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling'],
      reconnectionDelay: 1000,
      auth: { token },
    })

    socketRef.current = newSocket
    newSocket.on('connect', () => {
      console.log(`Connected with socket ID: ${newSocket.id}`)
    })

    newSocket.on('disconnect', (reason) => {
      console.log(`Disconnected: ${reason}`)
    })

    newSocket.on('error', (err) => {
      console.error('Socket error:', err.message)
    })

    newSocket.on('userJoined', (data) => {
      console.log('A user joined:', data)
    })
    return () => {
      console.log('Disconnecting socket...')
      newSocket.disconnect()
      socketRef.current = null
    }
  }, [token])

  return socketRef.current
}

export function useJoinRoom(socket: Socket | null, peerId?: string) {
  useEffect(() => {
    if (socket && peerId) {
      console.log(`Joining room: ${peerId}`)
      socket.emit('joinRoom', { peerId })
    }
  }, [socket, peerId])
}
