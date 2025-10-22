import type { Message } from '@/interface/chat'
import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

export interface SendMessage {
  conversationId: string
  content: string
}
export function useMessageHandler(
  socket: Socket | null,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) {
  const [isTyping, setIsTyping] = useState<string[]>([])
  useEffect(() => {
    if (!socket) return
    socket.onAny((event, ...args) => console.log('[socket] event', event, args))
    const handleNewMessage = (message: Message) => {
      console.log('Received new message:', message)
      setMessages((prevMessages) => [...prevMessages, message])
    }
    socket.on('newMessage', handleNewMessage)
    socket.on('userLeft', (data) => {
      console.log('A user left:', data)
    })
    socket.on('typing', (data: { userId: string; isTyping: boolean }) => {
      console.log('Typing event received:', data)
      if (data.isTyping) {
        setIsTyping((prev) => [...prev, data.userId])
      } else {
        setIsTyping((prev) => prev.filter((id) => id !== data.userId))
      }
    })
    socket.on('stopTyping', (data: { userId: string }) => {
      console.log('Stop typing event received:', data)
      setIsTyping((prev) => prev.filter((id) => id !== data.userId))
    })
    return () => {
      socket.off('newMessage', handleNewMessage)
      socket.off('userLeft')
      socket.off('typing')
      socket.off('stopTyping')
    }
  }, [socket, setMessages])
  const sendMessage = (message: SendMessage) => {
    console.log('Sending message:', message)
    if (!socket) return
    console.log('Emitting sendMessage event')
    socket.emit('sendMessage', message)
  }
  const setTypingStatus = (conversationId: string, typing: boolean) => {
    if (!socket) return
    console.log(`Emitting ${typing ? 'typing' : 'stopTyping'} event`)
    socket.emit(typing ? 'typing' : 'stopTyping', { conversationId })
  }
  return { sendMessage, setTypingStatus, isTyping }
}
