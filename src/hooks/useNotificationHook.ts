import React, { useEffect } from 'react'
import type { Socket } from 'socket.io-client'

export interface NotificationUpdate {
  id: string
  content: {
    id: string
    content: string
    createdAt: string
    sender: {
      id: string
      name: string
    }
  }
}
export default function useNotificationHandler(
  socket: Socket | null,
  updateNotification: (notification: NotificationUpdate) => void,
) {
  useEffect(() => {
    if (!socket) return

    socket.on('notification', (notification: NotificationUpdate) => {
      updateNotification(notification)
    })

    return () => {
      socket.off('notification')
    }
  }, [socket])
}
