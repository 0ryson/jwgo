import type { WeekMeetings } from '../src/types/weekMeetings'

const weekMeetingsData: WeekMeetings = {
  id: '0001',
  start: '2023-10-09',
  finish: '2023-10-15',
  meetings: [
    {
      id: '210923',
      type: 'midweek',
      day: 'miércoles',
      date: '2023-09-21',
      hour: '19:30',
      firstSong: 100,
      firstPrayer: {
        id: 1,
        name: 'David Merino',
      },
      chairman: {
        id: 2,
        name: 'Sergio Hazleden',
      },
      middleSong: 101,
      lastSong: 102,
      lastPrayer: {
        id: 3,
        name: 'Antonio Valenzuela',
      },
      treasures: {
        treasures: {
          id: 1,
          name: '',
        },
        spiritualGems: {
          id: 1,
          name: 'David Merino',
        },
        bibleReading: {
          id: 1,
          name: 'David Merino',
        },
      },
      ministry: {
        initialCallVideo: {
          id: 1,
          name: 'David Merino',
        },
        returnVisitVideo: {
          id: 1,
          name: 'David Merino',
        },
        initialCall: {
          id: 1,
          name: 'David Merino',
        },
        returnVisit: {
          id: 1,
          name: 'David Merino',
        },
        bibleStudy: {
          id: 1,
          name: 'David Merino',
        },
        talk: {
          id: 1,
          name: 'David Merino',
        },
      },
      living: {
        firstPart: {
          issue: 'Necesidades de la congregación',
          conductor: {
            id: 1,
            name: 'David Merino',
          },
        },
        secondPart: {
          issue: 'Informe del cuerpo gobernante',
          conductor: {
            id: 1,
            name: 'David Merino',
          },
        },
        congregationBibleStudy: {
          conductor: {
            id: 1,
            name: 'David Merino',
          },
          reader: {
            id: 1,
            name: 'David Merino',
          },
        },
      },
    },
    {
      id: '210923',
      type: 'weekend',
      day: 'sábado',
      date: '2023-09-23',
      hour: '19:00',
      firstSong: 100,
      firstPrayer: {
        id: 1,
        name: 'David Merino',
      },
      chairman: {
        id: 2,
        name: 'Sergio Hazleden',
      },
      middleSong: 101,
      lastSong: 102,
      lastPrayer: {
        id: 3,
        name: 'Antonio Valenzuela',
      },
      publicTalk: {
        issue: 'Las maravillas de la creación',
        speaker: {
          id: 1,
          name: 'David Merino',
        },
        congregation: 'Armilla Norte',
      },
      watchtowerStudy: {
        issue: 'Las maravillas de la creación',
        conductor: {
          id: 1,
          name: 'David Merino',
        },
        reader: {
          id: 1,
          name: 'Sergio Hazleden',
        },
      },
    },
  ],
}

export { weekMeetingsData }
