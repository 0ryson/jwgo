import SelectPerson from '@components/molecules/SelectPerson'
import { useStore } from '@nanostores/react'
import { weekMeetingsStore } from '../../stores/weekMeetings'
import { useMemo, useState } from 'react'
import type { WeekMeetings as WeekMeetingsType } from '../../types/weekMeetings.ts'
import { MeetingPicker } from '@components/molecules/MeetingPicker.tsx'
import { MeetingRow } from '@components/molecules/MeetingRow.tsx'
import CalendarIcon from '@components/atoms/icons/CalendarIcon.tsx'
import DropdownOptions from '@components/atoms/dropdownOptions.tsx'
import ToggleSwitch from '@components/atoms/ToggleSwitch.tsx'

interface Props {
  calendarIcon?: React.ReactElement
}

export const WeekMeetings = ({ calendarIcon }: Props) => {
  const weekDataStore = useStore(weekMeetingsStore)
  const start = useMemo(
    () => new Date(weekDataStore.start).setHours(0, 0, 0, 0),
    []
  )
  const finish = useMemo(
    () => new Date(weekDataStore.finish).setHours(0, 0, 0, 0),
    []
  )

  const [weekData, setWeekDataState] = useState<WeekMeetingsType | undefined>()

  const selectedDateFn = (date: number) => {
    if (date >= start && date <= finish) {
      setWeekDataState(weekDataStore)
    } else {
      setWeekDataState(undefined)
    }
  }

  // Save the new data into the store
  const saveData = () => {
    weekData && weekMeetingsStore.set(weekData)
  }

  return (
    <>
      <h1 className="mb-6 text-2xl lg:text-3xl font-medium tracking-tight text-center">
        Programa de reuniones
      </h1>
      <div className="mt-2 mb-8 lg:mb-10">
        <MeetingPicker selectedDateCallback={selectedDateFn} />
      </div>
      {!weekData ? (
        <div>No data</div>
      ) : (
        <div className="relative">
          <div className="absolute top-0 w-1/2 h-full ml-[50%] border-l-2 border-blue-200"></div>
          <ol className="relative">
            {weekData.meetings.map((meeting, meetingKey) => {
              return (
                <li
                  className="flex flex-col justify-center items-center"
                  key={meetingKey}
                >
                  <div className="flex items-center justify-center space-x-3 z-0 sticky -top-3 mx-6 py-2 w-fit p-4 bg-blue-200 rounded-lg">
                    <CalendarIcon
                      size={28}
                      strokeColor="rgb(71,85,105)"
                      strokeWidth={1}
                    />
                    <h3 className="text-md text-slate-600">
                      <span className="capitalize">{meeting.day} </span>
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

                  <div
                    className={`py-8 ${
                      meetingKey === weekData.meetings.length - 1 && 'pb-0'
                    } w-full`}
                  >
                    {meeting.type === 'midweek' && (
                      <div className="max-w-full p-6 bg-white border-2 border-blue-200 rounded-lg">
                        <div className="flex justify-between">
                          <h5 className="mb-6 text-2xl font-medium tracking-tight">
                            {'Vida y ministerio cristiano'}
                          </h5>

                          {/* <DropdownOptions>
                            <ul className="py-2 text-sm text-gray-700">
                              <li className="px-4 py-2 hover:bg-gray-100">
                                <div className="flex p-2 rounded hover:bg-gray-100">
                                  <ToggleSwitch
                                    title="Editar reunión de esta semana"
                                    onClickCallback={() =>
                                      console.log('onClickCallback')
                                    }
                                  />
                                </div>
                              </li>
                            </ul>
                          </DropdownOptions> */}
                        </div>

                        {meeting.firstSong && meeting.firstPrayer && (
                          <MeetingRow
                            title={meeting.firstSong ? 'Canción' : ''}
                            titleValue={
                              meeting.firstSong ? meeting.firstSong : ''
                            }
                            subtitle={meeting.firstPrayer ? 'Oración' : ''}
                            person={
                              <SelectPerson
                                selected={meeting.firstPrayer}
                                participation="firstPrayer"
                                callback={(person) => {
                                  weekData!.meetings[meetingKey].firstPrayer =
                                    person
                                  saveData()
                                }}
                              />
                            }
                          />
                        )}

                        {meeting.chairman && (
                          <MeetingRow
                            title={'Presidente'}
                            person={
                              <SelectPerson
                                selected={meeting.chairman}
                                participation="chairman"
                                callback={(person) => {
                                  weekData!.meetings[meetingKey].chairman =
                                    person
                                  saveData()
                                }}
                              />
                            }
                          />
                        )}

                        {meeting.treasures && (
                          <div>
                            <div className="my-3 py-2 px-3 bg-slate-500 rounded-sm text-white">
                              Tesoros de la Biblia
                            </div>

                            {meeting.treasures.treasures && (
                              <MeetingRow
                                title={'Tesoros'}
                                person={
                                  <SelectPerson
                                    selected={meeting.treasures.treasures}
                                    participation="treasures.treasures"
                                    callback={(person) => {
                                      weekData!.meetings[
                                        meetingKey
                                      ].treasures!.treasures = person
                                      saveData()
                                    }}
                                  />
                                }
                              />
                            )}

                            {meeting.treasures.spiritualGems && (
                              <MeetingRow
                                title={'Busquemos perlas escondidas'}
                                person={
                                  <SelectPerson
                                    selected={meeting.treasures.spiritualGems}
                                    participation="treasures.spiritualGems"
                                    callback={(person) => {
                                      weekData!.meetings[
                                        meetingKey
                                      ].treasures!.spiritualGems = person
                                      saveData()
                                    }}
                                  />
                                }
                              />
                            )}

                            {meeting.treasures.bibleReading && (
                              <MeetingRow
                                title={'Lectura de la Biblia'}
                                person={
                                  <SelectPerson
                                    selected={meeting.treasures.bibleReading}
                                    participation="treasures.bibleReading"
                                    callback={(person) => {
                                      weekData!.meetings[
                                        meetingKey
                                      ].treasures!.bibleReading = person
                                      saveData()
                                    }}
                                  />
                                }
                              />
                            )}
                          </div>
                        )}

                        {meeting.ministry && (
                          <div>
                            <div className="my-3 py-2 px-3 bg-yellow-600 rounded-sm text-white">
                              Seamos mejores maestros
                            </div>

                            {meeting.ministry.initialCallVideo && (
                              <MeetingRow
                                title={'Video de la primera conversación'}
                                person={
                                  <SelectPerson
                                    selected={meeting.ministry.initialCallVideo}
                                    participation="ministry.initialCallVideo"
                                    callback={(person) => {
                                      weekData!.meetings[
                                        meetingKey
                                      ].ministry!.initialCallVideo = person
                                      saveData()
                                    }}
                                  />
                                }
                              />
                            )}

                            {meeting.ministry.returnVisitVideo && (
                              <MeetingRow
                                title={'Video de la primera revisita'}
                                person={
                                  <SelectPerson
                                    selected={meeting.ministry.returnVisitVideo}
                                    participation="ministry.returnVisitVideo"
                                    callback={(person) => {
                                      weekData!.meetings[
                                        meetingKey
                                      ].ministry!.returnVisitVideo = person
                                      saveData()
                                    }}
                                  />
                                }
                              />
                            )}

                            {meeting.ministry.initialCall && (
                              <MeetingRow
                                title={'Primera conversación'}
                                person={
                                  <SelectPerson
                                    selected={meeting.ministry.initialCall}
                                    participation="ministry.initialCall"
                                    callback={(person) => {
                                      weekData!.meetings[
                                        meetingKey
                                      ].ministry!.initialCall = person
                                      saveData()
                                    }}
                                  />
                                }
                              />
                            )}

                            {meeting.ministry.returnVisit && (
                              <MeetingRow
                                title={'Revisita'}
                                person={
                                  <SelectPerson
                                    selected={meeting.ministry.returnVisit}
                                    participation="ministry.returnVisit"
                                    callback={(person) => {
                                      weekData!.meetings[
                                        meetingKey
                                      ].ministry!.returnVisit = person
                                      saveData()
                                    }}
                                  />
                                }
                              />
                            )}

                            {meeting.ministry.bibleStudy && (
                              <MeetingRow
                                title={'Estudio bíblico'}
                                person={
                                  <SelectPerson
                                    selected={meeting.ministry.bibleStudy}
                                    participation="ministry.bibleStudy"
                                    callback={(person) => {
                                      weekData!.meetings[
                                        meetingKey
                                      ].ministry!.bibleStudy = person
                                      saveData()
                                    }}
                                  />
                                }
                              />
                            )}

                            {meeting.ministry.talk && (
                              <MeetingRow
                                title={'Discurso'}
                                person={
                                  <SelectPerson
                                    selected={meeting.ministry.talk}
                                    participation="ministry.talk"
                                    callback={(person) => {
                                      weekData!.meetings[
                                        meetingKey
                                      ].ministry!.talk = person
                                      saveData()
                                    }}
                                  />
                                }
                              />
                            )}
                          </div>
                        )}

                        {meeting.living && (
                          <div className="my-3 py-2 px-3 bg-red-800 rounded-sm text-white">
                            Nuestra vida cristiana
                          </div>
                        )}

                        {meeting.middleSong && (
                          <MeetingRow
                            title={meeting.middleSong ? 'Canción' : ''}
                            titleValue={
                              meeting.middleSong ? meeting.middleSong : ''
                            }
                          />
                        )}

                        {meeting.living && (
                          <div>
                            {meeting.living.firstPart && (
                              <MeetingRow
                                title={meeting.living.firstPart.issue}
                                person={
                                  <SelectPerson
                                    selected={
                                      meeting.living.firstPart.conductor
                                    }
                                    participation="living.firstPart.conductor"
                                    callback={(person) => {
                                      weekData!.meetings[
                                        meetingKey
                                      ].living!.firstPart!.conductor = person
                                      saveData()
                                    }}
                                  />
                                }
                              />
                            )}

                            {meeting.living.secondPart && (
                              <MeetingRow
                                title={meeting.living.secondPart.issue}
                                person={
                                  <SelectPerson
                                    selected={
                                      meeting.living.secondPart.conductor
                                    }
                                    participation="living.secondPart.conductor"
                                    callback={(person) => {
                                      weekData!.meetings[
                                        meetingKey
                                      ].living!.secondPart!.conductor = person
                                      saveData()
                                    }}
                                  />
                                }
                              />
                            )}

                            {meeting.living.congregationBibleStudy && (
                              <>
                                <MeetingRow
                                  title={'Estudio bíblico de congregación'}
                                  subtitle={'Conductor'}
                                  person={
                                    <SelectPerson
                                      selected={
                                        meeting.living.congregationBibleStudy
                                          .conductor
                                      }
                                      participation="living.congregationBibleStudy.conductor"
                                      callback={(person) => {
                                        weekData!.meetings[
                                          meetingKey
                                        ].ministry!.talk = person
                                        saveData()
                                      }}
                                    />
                                  }
                                />

                                <MeetingRow
                                  subtitle={'Lector'}
                                  person={
                                    <SelectPerson
                                      selected={
                                        meeting.living.congregationBibleStudy
                                          .reader
                                      }
                                      participation="living.congregationBibleStudy.reader"
                                      callback={(person) => {
                                        weekData!.meetings[
                                          meetingKey
                                        ].ministry!.talk = person
                                        saveData()
                                      }}
                                    />
                                  }
                                />
                              </>
                            )}
                          </div>
                        )}

                        {meeting.lastSong && meeting.lastPrayer && (
                          <MeetingRow
                            title={meeting.lastSong ? 'Canción' : ''}
                            titleValue={
                              meeting.lastSong ? meeting.lastSong : ''
                            }
                            subtitle={meeting.lastPrayer ? 'Oración' : ''}
                            person={
                              <SelectPerson
                                selected={meeting.lastPrayer}
                                participation="lastPrayer"
                                callback={(person) => {
                                  weekData!.meetings[meetingKey].lastPrayer =
                                    person
                                  saveData()
                                }}
                              />
                            }
                          />
                        )}
                      </div>
                    )}

                    {meeting.type === 'weekend' && (
                      <div className="max-w-full p-6 bg-white border-2 border-blue-200 rounded-lg">
                        <h5 className="mb-6 text-2xl font-medium tracking-tight">
                          {'Reunión Pública'}
                        </h5>

                        {meeting.firstSong && meeting.firstPrayer && (
                          <MeetingRow
                            title={meeting.firstSong ? 'Canción' : ''}
                            titleValue={
                              meeting.firstSong ? meeting.firstSong : ''
                            }
                            subtitle={meeting.firstPrayer ? 'Oración' : ''}
                            person={
                              <SelectPerson
                                selected={meeting.firstPrayer}
                                participation="firstPrayer"
                                callback={(person) => {
                                  weekData!.meetings[meetingKey].firstPrayer =
                                    person
                                  saveData()
                                }}
                              />
                            }
                          />
                        )}

                        {meeting.chairman && (
                          <MeetingRow
                            title={'Presidente'}
                            person={
                              <SelectPerson
                                selected={meeting.chairman}
                                participation="chairman"
                                callback={(person) => {
                                  weekData!.meetings[meetingKey].chairman =
                                    person
                                  saveData()
                                }}
                              />
                            }
                          />
                        )}

                        {meeting.publicTalk && (
                          <div>
                            <div className="my-3 py-2 px-3 bg-slate-500 rounded-sm text-white">
                              Discurso público
                            </div>

                            <MeetingRow
                              title={meeting.publicTalk.issue}
                              subtitle={'Discursante'}
                              person={
                                <SelectPerson
                                  selected={meeting.publicTalk.speaker}
                                  participation="publicTalk.speaker"
                                  callback={(person) => {
                                    weekData!.meetings[
                                      meetingKey
                                    ].publicTalk!.speaker = person
                                    saveData()
                                  }}
                                />
                              }
                            />

                            <MeetingRow
                              subtitle={'Congregación'}
                              person={meeting.publicTalk.congregation}
                            />
                          </div>
                        )}

                        {meeting.watchtowerStudy && (
                          <div className="my-3 py-2 px-3 bg-yellow-600 rounded-sm text-white">
                            Estudio de La Atalaya
                          </div>
                        )}

                        {meeting.middleSong && (
                          <MeetingRow
                            title={meeting.middleSong ? 'Canción' : ''}
                            titleValue={
                              meeting.middleSong ? meeting.middleSong : ''
                            }
                          />
                        )}

                        {meeting.watchtowerStudy && (
                          <>
                            <MeetingRow
                              title={meeting.watchtowerStudy.issue}
                              subtitle={'Conductor'}
                              person={
                                <SelectPerson
                                  selected={meeting.watchtowerStudy.conductor}
                                  participation="watchtowerStudy.conductor"
                                  callback={(person) => {
                                    weekData!.meetings[
                                      meetingKey
                                    ].watchtowerStudy!.conductor = person
                                    saveData()
                                  }}
                                />
                              }
                            />

                            <MeetingRow
                              subtitle={'Lector'}
                              person={
                                <SelectPerson
                                  selected={meeting.watchtowerStudy.reader}
                                  participation="watchtowerStudy.reader"
                                  callback={(person) => {
                                    weekData!.meetings[
                                      meetingKey
                                    ].watchtowerStudy!.reader = person
                                    saveData()
                                  }}
                                />
                              }
                            />
                          </>
                        )}

                        {meeting.lastSong && meeting.lastPrayer && (
                          <MeetingRow
                            title={meeting.lastSong ? 'Canción' : ''}
                            titleValue={
                              meeting.lastSong ? meeting.lastSong : ''
                            }
                            subtitle={meeting.lastPrayer ? 'Oración' : ''}
                            person={
                              <SelectPerson
                                selected={meeting.lastPrayer}
                                participation="lastPrayer"
                                callback={(person) => {
                                  weekData!.meetings[meetingKey].lastPrayer =
                                    person
                                  saveData()
                                }}
                              />
                            }
                          />
                        )}
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </>
  )
}
