import { atom } from 'nanostores'
import { weekMeetingsData } from '../../mocks/weekMeetings'

export const weekMeetingsStore = atom(weekMeetingsData)
