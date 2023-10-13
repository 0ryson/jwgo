import type { Person, PersonBasics } from './persons'

interface Meeting {
  id: string
  type: 'midweek' | 'weekend' | 'memorial'
  day: string
  date: string
  hour: string
  firstSong?: number
  firstPrayer?: PersonBasics
  chairman?: PersonBasics
  middleSong?: number
  lastSong?: number
  lastPrayer?: PersonBasics
}

interface MidweekMeeting extends Meeting {
  treasures?: {
    treasures?: PersonBasics
    spiritualGems?: PersonBasics
    bibleReading?: PersonBasics
  }
  ministry?: {
    initialCallVideo?: PersonBasics
    returnVisitVideo?: PersonBasics
    initialCall?: PersonBasics
    returnVisit?: PersonBasics
    bibleStudy?: PersonBasics
    talk?: PersonBasics
  }
  living?: {
    firstPart?: {
      issue: string
      conductor?: PersonBasics
    }
    secondPart?: {
      issue: string
      conductor?: PersonBasics
    }
    congregationBibleStudy?: {
      conductor?: PersonBasics
      reader?: PersonBasics
    }
  }
}

interface WeekendMeeting extends Meeting {
  publicTalk?: {
    issue: string
    speaker?: PersonBasics
    congregation: string
  }
  watchtowerStudy?: {
    issue: string
    conductor?: PersonBasics
    reader?: PersonBasics
  }
}

export interface WeekMeetings {
  id: string
  start: string
  finish: string
  meetings: (MidweekMeeting & WeekendMeeting)[]
}
