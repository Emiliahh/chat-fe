const mockChats = [
  {
    id: '1',
    title: 'Spica',
    avatar:
      'https://s4.anilist.co/file/anilistcdn/character/large/b175582-hDwS4CVocZa5.png',
    lastMessage: 'Hey! How are you doing today?',
    timestamp: '2:30 PM',
  },
  {
    id: '2',
    title: 'Petra',
    avatar:
      'https://witchculttranslation.com/wp-content/uploads/2025/05/GrO9pOSXMAAT-RN.jpg',
    lastMessage: 'Thanks for the help earlier!',
    timestamp: '1:45 PM',
  },
  {
    id: '3',
    title: 'Echidna',
    avatar:
      'https://i.pinimg.com/474x/9b/41/d6/9b41d69b4ea3c10102cb142d87de1e19.jpg',
    lastMessage: 'Curse thee, thout art a fool😡. Thy deeds deemed unforgiven',
    timestamp: '12:00 PM',
  },
  {
    id: '4',
    title: 'Shaula',
    avatar:
      'https://assets.mycast.io/characters/shaula-3370462-normal.jpg?1628601892',
    lastMessage: 'Master!!!',
    timestamp: '11:30 AM',
  },
  
]

const mockMessages: Record<string, any[]> = {
  '1': [
    { id: 1, message: '要上好。您好！有什么我可以帮助您的吗？', isUser: false, avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b175582-hDwS4CVocZa5.png' },
    { id: 2, message: '我有一个关于我的订单的问题。', isUser: true },
    { id: 3, message: '当然！请告诉我您的订单号码是多少？', isUser: false, avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b175582-hDwS4CVocZa5.png' },
    { id: 4, message: '它是 12345。', isUser: true },
    { id: 5, message: '谢谢！让我为您检查一下。', isUser: false, avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b175582-hDwS4CVocZa5.png' },
    { id: 6, message: '进度如何？', isUser: true },
    { id: 7, message: '正在处理中，大概需要 2 天。', isUser: false, avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b175582-hDwS4CVocZa5.png' },
    { id: 8, message: '好，麻烦你了 🙏', isUser: true },
    { id: 9, message: '不客气！', isUser: false, avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b175582-hDwS4CVocZa5.png' },
    { id: 10, message: '顺便帮我查一下物流吧？', isUser: true },
    { id: 11, message: '物流编号是多少？', isUser: false, avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b175582-hDwS4CVocZa5.png' },
    { id: 12, message: '98765', isUser: true },
    { id: 13, message: '好的，我查到它现在在上海。', isUser: false, avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b175582-hDwS4CVocZa5.png' },
    { id: 14, message: '太好了，谢谢。', isUser: true },
    { id: 15, message: '祝您有美好的一天！', isUser: false, avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b175582-hDwS4CVocZa5.png' },
    { id: 16, message: '你们有退款政策吗？', isUser: true },
    { id: 17, message: '有的，7 天内可以申请退款。', isUser: false, avatarUrl: 'https://s4.anilist.co/file/anilistcdn/character/large/b175582-hDwS4CVocZa5.png' },
    { id: 18, message: '了解了 🙆', isUser: true },
  ],
  '2': [
    { id: 19, message: 'Hey Petra, how is the project going?', isUser: true },
    { id: 20, message: "It's on track, thanks for asking!", isUser: false, avatarUrl: 'https://witchculttranslation.com/wp-content/uploads/2025/05/GrO9pOSXMAAT-RN.jpg' },
    { id: 21, message: 'Need help with translations?', isUser: false, avatarUrl: 'https://witchculttranslation.com/wp-content/uploads/2025/05/GrO9pOSXMAAT-RN.jpg' },
    { id: 22, message: "Yes, please! I'll send the file.", isUser: true },
    { id: 23, message: 'Got it, will deliver by tonight.', isUser: false, avatarUrl: 'https://witchculttranslation.com/wp-content/uploads/2025/05/GrO9pOSXMAAT-RN.jpg' },
    { id: 24, message: 'Legend 🙌', isUser: true },
    { id: 25, message: 'Haha, always.', isUser: false, avatarUrl: 'https://witchculttranslation.com/wp-content/uploads/2025/05/GrO9pOSXMAAT-RN.jpg' },
    { id: 26, message: 'Coffee tomorrow?', isUser: true },
    { id: 27, message: 'Sure, 9 AM at the usual spot.', isUser: false, avatarUrl: 'https://witchculttranslation.com/wp-content/uploads/2025/05/GrO9pOSXMAAT-RN.jpg' },
    { id: 28, message: 'Deal ☕', isUser: true },
    {
      id: 29,
      message: 'By the way, client feedback was positive.',
      isUser: false,
      avatarUrl: 'https://witchculttranslation.com/wp-content/uploads/2025/05/GrO9pOSXMAAT-RN.jpg',
    },
    { id: 30, message: "Awesome, let's prepare final docs.", isUser: true },
  ],
  '3': [
    { id: 31, message: 'Thou dare challenge me again?', isUser: false, avatarUrl: 'https://i.pinimg.com/474x/9b/41/d6/9b41d69b4ea3c10102cb142d87de1e19.jpg' },
    { id: 32, message: 'Yes, and this time I shall win!', isUser: true },
    { id: 33, message: 'Pitiful worm, thou shall not prevail.', isUser: false, avatarUrl: 'https://i.pinimg.com/474x/9b/41/d6/9b41d69b4ea3c10102cb142d87de1e19.jpg' },
    { id: 34, message: 'Watch me prove you wrong!', isUser: true },
    { id: 35, message: 'Then let the trial begin!', isUser: false, avatarUrl: 'https://i.pinimg.com/474x/9b/41/d6/9b41d69b4ea3c10102cb142d87de1e19.jpg' },
    { id: 36, message: '*draws sword*', isUser: true },
    { id: 37, message: 'Your courage will be your downfall.', isUser: false, avatarUrl: 'https://i.pinimg.com/474x/9b/41/d6/9b41d69b4ea3c10102cb142d87de1e19.jpg' },
    { id: 38, message: "We'll see about that!", isUser: true },
    { id: 39, message: 'Prepare thyself!', isUser: false, avatarUrl: 'https://i.pinimg.com/474x/9b/41/d6/9b41d69b4ea3c10102cb142d87de1e19.jpg' },
    { id: 40, message: '*charges forward*', isUser: true },
    { id: 41, message: 'Impressive speed, but futile.', isUser: false, avatarUrl: 'https://i.pinimg.com/474x/9b/41/d6/9b41d69b4ea3c10102cb142d87de1e19.jpg' },
  ],
  '4': [
    { id: 42, message: 'MASTER!!!', isUser: false, avatarUrl: 'https://assets.mycast.io/characters/shaula-3370462-normal.jpg?1628601892' },
    { id: 43, message: 'Shaula, calm down...', isUser: true },
    { id: 44, message: 'I MISSED YOU SO MUCH!', isUser: false, avatarUrl: 'https://assets.mycast.io/characters/shaula-3370462-normal.jpg?1628601892' },
    { id: 45, message: 'Haha, I know, I know.', isUser: true },
    { id: 46, message: "Please don't leave me again 😢", isUser: false, avatarUrl: 'https://assets.mycast.io/characters/shaula-3370462-normal.jpg?1628601892' },
    { id: 47, message: "I'll always be here.", isUser: true },
    { id: 48, message: 'Promise?', isUser: false, avatarUrl: 'https://assets.mycast.io/characters/shaula-3370462-normal.jpg?1628601892' },
    { id: 49, message: 'Promise 🤞', isUser: true },
  ],
}

export { mockChats, mockMessages }