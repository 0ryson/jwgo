import SelectPerson from '@components/molecules/SelectPerson'
import { useStore } from '@nanostores/react'
import { weekMeetingsStore } from '../../stores/weekMeetings'
import { useMemo, useState } from 'react'
import type { WeekMeetings as WeekMeetingsType } from '../../types/weekMeetings.ts'
import { MeetingPicker } from '@components/molecules/MeetingPicker.tsx'
import { MeetingRow } from '@components/molecules/MeetingRow.tsx'

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
      <MeetingPicker selectedDateCallback={selectedDateFn} />

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
                  {meeting.type === 'midweek' && (
                    <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg">
                      <h5 className="mb-6 text-2xl font-medium tracking-tight">
                        {'Vida y ministerio cristiano'}
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
                              callback={(person) => {
                                weekData!.meetings[meetingKey].chairman = person
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
                                  selected={meeting.living.firstPart.conductor}
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
                                  selected={meeting.living.secondPart.conductor}
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
                          titleValue={meeting.lastSong ? meeting.lastSong : ''}
                          subtitle={meeting.lastPrayer ? 'Oración' : ''}
                          person={
                            <SelectPerson
                              selected={meeting.lastPrayer}
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
                    <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg">
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
                              callback={(person) => {
                                weekData!.meetings[meetingKey].chairman = person
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
                          titleValue={meeting.lastSong ? meeting.lastSong : ''}
                          subtitle={meeting.lastPrayer ? 'Oración' : ''}
                          person={
                            <SelectPerson
                              selected={meeting.lastPrayer}
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
      )}
    </>
  )
}
