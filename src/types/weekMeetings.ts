import type { Person } from './persons'

interface Meeting {
  id: string
  type: 'midweek' | 'weekend' | 'memorial'
  day: string
  date: string
  hour: string
  firstSong?: number
  firstPrayer?: Person
  chairman?: Person
  middleSong?: number
  lastSong?: number
  lastPrayer?: Person
}

interface MidweekMeeting extends Meeting {
  treasures?: {
    treasures?: Person
    spiritualGems?: Person
    bibleReading?: Person
  }
  ministry?: {
    initialCallVideo?: Person
    returnVisitVideo?: Person
    initialCall?: Person
    returnVisit?: Person
    bibleStudy?: Person
    talk?: Person
  }
  living?: {
    firstPart?: {
      issue: string
      conductor?: Person
    }
    secondPart?: {
      issue: string
      conductor?: Person
    }
    congregationBibleStudy?: {
      conductor?: Person
      reader?: Person
    }
  }
}

interface WeekendMeeting extends Meeting {
  publicTalk?: {
    issue: string
    speaker?: Person
    congregation: string
  }
  watchtowerStudy?: {
    issue: string
    conductor?: Person
    reader?: Person
  }
}

export interface WeekMeetings {
  id: string
  start: string
  finish: string
  meetings: (MidweekMeeting & WeekendMeeting)[]
}
