import type { Person } from '../src/types/persons'

const persons: Person[] = [
  {
    id: 0,
    name: 'David Merino',
    last: {
      meetingId: '0001',
      participation: 'treasures.treasures',
      date: '2023-05-01',
    },
    other: {
      meetingId: '0001',
      participation: 'ministry.talk',
      date: '2023-10-02',
    },
    priority: 3,
  },
  {
    id: 1,
    name: 'Sergio Hazleden',
    last: {
      meetingId: '0001',
      participation: 'ministry.talk',
      date: '2023-05-11',
    },
    other: {
      meetingId: '0001',
      participation: 'ministry.talk',
      date: '2023-08-05',
    },
    priority: 2,
  },
  {
    id: 2,
    name: 'Gaby Mulatti',
    last: {
      meetingId: '0001',
      participation: 'ministry.talk',
      date: '2023-07-21',
    },
    other: {
      meetingId: '0001',
      participation: 'ministry.talk',
      date: '2023-07-28',
    },
    priority: 1,
  },
]
export { persons }
