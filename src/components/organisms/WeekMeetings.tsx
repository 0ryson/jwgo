import SelectPerson from '@components/molecules/SelectPerson'
import { useStore } from '@nanostores/react'
import { weekMeetingsStore } from '../../stores/weekMeetings'
import Datepicker from 'tailwind-datepicker-react'
import { useEffect, useMemo, useState } from 'react'
import LeftIcon from '../atoms/icons/LeftIcon.tsx'
import RightIcon from '../atoms/icons/RightIcon.tsx'
import type { WeekMeetings as WeekMeetingsType } from '../../types/weekMeetings.ts'
import { Mask } from '../molecules/Mask.tsx'

const options = {
  autoHide: true,
  todayBtn: true,
  todayBtnText: 'Hoy', // TODO: Change to dynamic text
  clearBtn: false,
  weekDays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'], // TODO: Change to dynamic text
  maxDate: new Date('2050-01-01'),
  minDate: new Date('2000-01-01'),
  theme: {
    background: 'bg-slate-100 dark:bg-slate-100',
    todayBtn:
      'bg-lime-600 dark:bg-lime-600 text-lime-50 dark:text-lime-50 hover:bg-lime-500 dark:hover:bg-lime-500 active:ring-4 active:ring-lime-300 focus:ring-0',
    clearBtn: '',
    icons:
      'bg-slate-100 dark:bg-slate-100 text-slate-600 dark:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-200 hover:text-slate-600 dark:hover:text-slate-600',
    text: 'text-slate-600 dark:text-slate-600 font-normal dark:font-normal hover:bg-slate-200 dark:hover:bg-slate-200 hover:text-slate-600 dark:hover:text-slate-600',
    disabledText:
      'opacity-50 text-slate-500 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-200',
    input: 'text-center',
    inputIcon: '',
    selected:
      'bg-lime-600 dark:bg-lime-600 text-lime-50 dark:text-lime-50 hover:bg-lime-500 dark:hover:bg-lime-500  hover:text-lime-50 dark:hover:text-lime-50',
  },
  icons: {
    prev: () => <LeftIcon />,
    next: () => <RightIcon />,
  },
  datepickerClassNames: 'top-8 left-1/2 transform -translate-x-1/2 ',
  defaultDate: new Date(),
  language: 'es-ES', // TODO: Change to dynamic language
  inputDateFormatProp: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
}

interface Props {
  calendarIcon?: React.ReactElement
}

export const WeekMeetings = ({ calendarIcon }: Props) => {
  const weekDataStore = useStore(weekMeetingsStore)

  const today = useMemo(() => new Date().setHours(0, 0, 0, 0), [])
  const start = useMemo(
    () => new Date(weekDataStore.start).setHours(0, 0, 0, 0),
    []
  )
  const finish = useMemo(
    () => new Date(weekDataStore.finish).setHours(0, 0, 0, 0),
    []
  )

  const [weekData, setWeekDataState] = useState<WeekMeetingsType | undefined>()

  const [show, setShow] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<number>(today)

  const handleChange = (selectedDate: Date) => {
    console.log('selectedDate', selectedDate)
    const selectedDateNumber = selectedDate.setHours(0, 0, 0, 0)
    setSelectedDate(selectedDateNumber)
  }

  const handleClose = (state: boolean) => {
    console.log('state', state)
    setShow(state)
  }

  useEffect(() => {
    if (selectedDate >= start && selectedDate <= finish) {
      setWeekDataState(weekDataStore)
    } else {
      setWeekDataState(undefined)
    }
  }, [selectedDate])

  // Save the new data into the store
  const saveData = () => {
    weekData && weekMeetingsStore.set(weekData)
  }

  return (
    <>
      <div className="flex justify-center mt-1 mb-4">
        <div className="w-full lg:w-min">
          <ul className="flex items-center -space-x-px h-8 text-base">
            <li>
              <div
                onClick={() => {
                  const currentDate = new Date(selectedDate)
                  const previewWeek = currentDate.setDate(
                    currentDate.getDate() - 7
                  )
                  setSelectedDate(previewWeek)
                }}
                className="flex items-center justify-center px-4 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-md active:ring-4 active:ring-lime-300 active:relative active:z-10"
              >
                <LeftIcon />
              </div>
            </li>
            <li className="flex-grow lg:flex-grow-0">
              <div className="flex items-end justify-center relative h-8 text-center leading-tight text-gray-500 bg-white border border-gray-300">
                <Datepicker
                  options={options}
                  onChange={handleChange}
                  show={show}
                  setShow={handleClose}
                >
                  <Mask show={show} showCallback={handleClose} />
                  <input
                    type="text"
                    placeholder="Select Date"
                    value={new Date(selectedDate).toLocaleDateString(
                      options.language,
                      options.inputDateFormatProp as Intl.DateTimeFormatOptions
                    )}
                    onFocus={() => setShow(true)}
                    readOnly
                    className="w-full lg:w-60 h-7 text-center rounded-sm outline-0"
                  />
                </Datepicker>
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  const currentDate = new Date(selectedDate)
                  const nextwWeek = currentDate.setDate(
                    currentDate.getDate() + 7
                  )
                  setSelectedDate(nextwWeek)
                }}
                className="flex items-center justify-center px-4 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-md active:ring-4 active:ring-lime-300 active:relative active:z-10"
              >
                <RightIcon />
              </div>
            </li>
          </ul>
        </div>
      </div>

      {!weekData ? (
        <div>No data</div>
      ) : (
        <ol className="lg:ml-5 relative lg:border-l border-gray-200">
          {weekData.meetings.map((meeting, meetingKey) => {
            return (
              <li className="lg:ml-10" key={meetingKey}>
                <div className="z-0 sticky -top-4 pt-4 -ml-1 lg:-ml-[60px] bg-white flex space-x-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-white">
                    {calendarIcon}
                  </span>
                  <h3 className="pb-1 lg:pb-4 pt-2 pl-1 text-lg tracking-tight text-slate-500">
                    <span className="capitalize">{meeting.day}</span>{' '}
                    <span>
                      {new Date(meeting.date).toLocaleString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                      })}
                    </span>
                    <span> | </span>
                    <span>{meeting.hour}</span>
                  </h3>
                </div>

                <div className="py-4">
                  <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg">
                    <h5 className="mb-6 text-2xl font-medium tracking-tight">
                      {meeting.type === 'midweek' &&
                        'Vida y ministerio cristiano'}
                      {meeting.type === 'weekend' && 'Reunión Pública'}
                      {meeting.type === 'memorial' && 'Conmemoración'}
                    </h5>

                    {meeting.firstSong && meeting.firstPrayer && (
                      <div className="flex flex-row justify-between mb-1 font-light">
                        {meeting.firstSong && (
                          <div>
                            <span>Canción </span>
                            <span className="font-medium">
                              {meeting.firstSong}
                            </span>
                          </div>
                        )}

                        {meeting.firstPrayer && (
                          <div className="flex flex-1 justify-end items-center">
                            <span className="mr-4">Oración</span>
                            <SelectPerson
                              selected={meeting.firstPrayer}
                              callback={(person) => {
                                weekData!.meetings[meetingKey].firstPrayer =
                                  person
                                saveData()
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {meeting.chairman && (
                      <div className="flex flex-row justify-between mb-1 font-light">
                        <div>Presidente</div>
                        <div className="flex flex-1 justify-end items-center">
                          <SelectPerson
                            selected={meeting.chairman}
                            callback={(person) => {
                              weekData!.meetings[meetingKey].chairman = person
                              saveData()
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {meeting.treasures && (
                      <div>
                        <div className="my-3 py-2 px-3 bg-slate-500 rounded-sm text-white">
                          Tesoros de la Biblia
                        </div>

                        {meeting.treasures.treasures && (
                          <div className="flex flex-row justify-between mb-1 font-light">
                            <div>Tesoros</div>
                            <div>
                              <SelectPerson
                                selected={meeting.treasures.treasures}
                                callback={(person) => {
                                  weekData!.meetings[
                                    meetingKey
                                  ].treasures!.treasures = person
                                  saveData()
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {meeting.treasures.spiritualGems && (
                          <div className="flex flex-row justify-between mb-1 font-light">
                            <div>Busquemos perlas escondidas</div>
                            <div className="flex flex-1 justify-end items-center">
                              <SelectPerson
                                selected={meeting.treasures.spiritualGems}
                                callback={(person) => {
                                  weekData!.meetings[
                                    meetingKey
                                  ].treasures!.spiritualGems = person
                                  saveData()
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {meeting.treasures.bibleReading && (
                          <div className="flex flex-row justify-between mb-1 font-light">
                            <div>Lectura de la Biblia</div>
                            <div className="flex flex-1 justify-end items-center">
                              <SelectPerson
                                selected={meeting.treasures.bibleReading}
                                callback={(person) => {
                                  weekData!.meetings[
                                    meetingKey
                                  ].treasures!.bibleReading = person
                                  saveData()
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {meeting.ministry && (
                      <div>
                        <div className="my-3 py-2 px-3 bg-yellow-600 rounded-sm text-white">
                          Seamos mejores maestros
                        </div>

                        {meeting.ministry.initialCallVideo && (
                          <div className="flex flex-row justify-between mb-1 font-light">
                            <div>Video de la primera conversación</div>
                            <div className="flex flex-1 justify-end items-center">
                              <SelectPerson
                                selected={meeting.ministry.initialCallVideo}
                                callback={(person) => {
                                  weekData!.meetings[
                                    meetingKey
                                  ].ministry!.initialCallVideo = person
                                  saveData()
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {meeting.ministry.returnVisitVideo && (
                          <div className="flex flex-row justify-between mb-1 font-light">
                            <div>Video de la primera revisita</div>
                            <div className="flex flex-1 justify-end items-center">
                              <SelectPerson
                                selected={meeting.ministry.returnVisitVideo}
                                callback={(person) => {
                                  weekData!.meetings[
                                    meetingKey
                                  ].ministry!.returnVisitVideo = person
                                  saveData()
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {meeting.ministry.initialCall && (
                          <div className="flex flex-row justify-between mb-1 font-light">
                            <div>Primera conversación</div>
                            <div className="flex flex-1 justify-end items-center">
                              <SelectPerson
                                selected={meeting.ministry.initialCall}
                                callback={(person) => {
                                  weekData!.meetings[
                                    meetingKey
                                  ].ministry!.initialCall = person
                                  saveData()
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {meeting.ministry.returnVisit && (
                          <div className="flex flex-row justify-between mb-1 font-light">
                            <div>Revisita</div>
                            <div className="flex flex-1 justify-end items-center">
                              <SelectPerson
                                selected={meeting.ministry.returnVisit}
                                callback={(person) => {
                                  weekData!.meetings[
                                    meetingKey
                                  ].ministry!.returnVisit = person
                                  saveData()
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {meeting.ministry.bibleStudy && (
                          <div className="flex flex-row justify-between mb-1 font-light">
                            <div>Estudio bíblico</div>
                            <div className="flex flex-1 justify-end items-center">
                              <SelectPerson
                                selected={meeting.ministry.bibleStudy}
                                callback={(person) => {
                                  weekData!.meetings[
                                    meetingKey
                                  ].ministry!.bibleStudy = person
                                  saveData()
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {meeting.ministry.talk && (
                          <div className="flex flex-row justify-between mb-1 font-light">
                            <div>Discurso</div>
                            <div className="flex flex-1 justify-end items-center">
                              <SelectPerson
                                selected={meeting.ministry.talk}
                                callback={(person) => {
                                  weekData!.meetings[
                                    meetingKey
                                  ].ministry!.talk = person
                                  saveData()
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {meeting.living && (
                      <div className="my-3 py-2 px-3 bg-red-800 rounded-sm text-white">
                        Nuestra vida cristiana
                      </div>
                    )}

                    {meeting.publicTalk && (
                      <div>
                        <div className="my-3 py-2 px-3 bg-slate-500 rounded-sm text-white">
                          Discurso público
                        </div>

                        <div className="flex flex-row justify-between mb-1 font-light">
                          <div>{meeting.publicTalk.issue}</div>
                          <div className="flex flex-1 justify-end items-center">
                            <span className="mr-4 text-sm text-slate-500">
                              Discursante
                            </span>
                            <SelectPerson
                              selected={meeting.publicTalk.speaker}
                              callback={(person) => {
                                weekData!.meetings[
                                  meetingKey
                                ].publicTalk!.speaker = person
                                saveData()
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-row justify-between mb-1 font-light">
                          <div></div>
                          <div className="flex flex-1 justify-end items-center">
                            <span className="mr-4 text-sm text-slate-500">
                              Congregación
                            </span>
                            <span className="w-48 min-w-fit text-right font-normal">
                              {meeting.publicTalk.congregation}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {meeting.watchtowerStudy && (
                      <div className="my-3 py-2 px-3 bg-yellow-600 rounded-sm text-white">
                        Estudio de La Atalaya
                      </div>
                    )}

                    {meeting.middleSong && (
                      <div className="flex flex-row justify-between mb-1 font-light">
                        <div>
                          <span>Canción </span>
                          <span className="font-medium">
                            {meeting.middleSong}
                          </span>
                        </div>
                      </div>
                    )}

                    {meeting.living && (
                      <div>
                        {meeting.living.firstPart && (
                          <div className="flex flex-row justify-between mb-1 font-light">
                            <div>{meeting.living.firstPart.issue}</div>
                            <div className="flex flex-1 justify-end items-center">
                              <SelectPerson
                                selected={meeting.living.firstPart.conductor}
                                callback={(person) => {
                                  weekData!.meetings[
                                    meetingKey
                                  ].living!.firstPart!.conductor = person
                                  saveData()
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {meeting.living.secondPart && (
                          <div className="flex flex-row justify-between mb-1 font-light">
                            <div>{meeting.living.secondPart.issue}</div>
                            <div className="flex flex-1 justify-end items-center">
                              <SelectPerson
                                selected={meeting.living.secondPart.conductor}
                                callback={(person) => {
                                  weekData!.meetings[
                                    meetingKey
                                  ].living!.secondPart!.conductor = person
                                  saveData()
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {meeting.living.congregationBibleStudy && (
                          <div>
                            <div className="flex flex-row justify-between mb-1 font-light">
                              <div>Estudio bíblico de congregación</div>
                              <div className="flex flex-1 justify-end items-center">
                                <span className="mr-4 text-sm text-slate-500">
                                  Conductor
                                </span>
                                <SelectPerson
                                  selected={
                                    meeting.living.congregationBibleStudy
                                      .conductor
                                  }
                                  callback={(person) => {
                                    weekData!.meetings[
                                      meetingKey
                                    ].ministry!.talk = person
                                    saveData()
                                  }}
                                />
                              </div>
                            </div>

                            <div className="flex flex-row justify-between mb-1 font-light">
                              <div></div>
                              <div className="flex flex-1 justify-end items-center">
                                <span className="mr-4 text-sm text-slate-500">
                                  Lector
                                </span>
                                <SelectPerson
                                  selected={
                                    meeting.living.congregationBibleStudy.reader
                                  }
                                  callback={(person) => {
                                    weekData!.meetings[
                                      meetingKey
                                    ].ministry!.talk = person
                                    saveData()
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {meeting.watchtowerStudy && (
                      <div>
                        <div className="flex flex-row justify-between mb-1 font-light">
                          <div>{meeting.watchtowerStudy.issue}</div>
                          <div className="flex flex-1 justify-end items-center">
                            <span className="mr-4 text-sm text-slate-500">
                              Conductor
                            </span>
                            <SelectPerson
                              selected={meeting.watchtowerStudy.conductor}
                              callback={(person) => {
                                weekData!.meetings[
                                  meetingKey
                                ].watchtowerStudy!.conductor = person
                                saveData()
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex flex-row justify-between mb-1 font-light">
                          <div></div>
                          <div className="flex flex-1 justify-end items-center">
                            <span className="mr-4 text-sm text-slate-500">
                              Lector
                            </span>
                            <SelectPerson
                              selected={meeting.watchtowerStudy.reader}
                              callback={(person) => {
                                weekData!.meetings[
                                  meetingKey
                                ].watchtowerStudy!.reader = person
                                saveData()
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {meeting.lastSong && meeting.lastPrayer && (
                      <div className="flex flex-row justify-between mb-1 font-light">
                        {meeting.lastSong && (
                          <div>
                            <span>Canción </span>
                            <span className="font-medium">
                              {meeting.lastSong}
                            </span>
                          </div>
                        )}

                        {meeting.lastPrayer && (
                          <div className="flex flex-1 justify-end items-center">
                            <span className="mr-4">Oración</span>
                            <SelectPerson
                              selected={meeting.lastPrayer}
                              callback={(person) => {
                                weekData!.meetings[meetingKey].lastPrayer =
                                  person
                                saveData()
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      )}
    </>
  )
}
