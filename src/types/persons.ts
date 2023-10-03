export interface Person {
  id?: number
  name: string
  last?: {
    meetingId: string
    participation: string
    date: string
  }
  other?: {
    meetingId: string
    participation: string
    date: string
  }
  priority: 1 | 2 | 3
}
