import type { Person, PersonBasics } from '../../types/persons'
import { useState, useEffect, useMemo } from 'react'
import { persons } from '../../../mocks/persons'
import { Mask } from './Mask'
import VerticalArrowIcon from '../atoms/icons/VerticalArrowIcon'

interface Props {
  selected?: PersonBasics
  participation?: string
  disabled?: boolean
  onClickCallback: (person: PersonBasics | undefined) => void
}

const SelectPerson = ({
  selected,
  participation, // Send to endpoint
  disabled = false,
  onClickCallback,
}: Props) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false)
  const [personSelected, setPersonSelected] = useState<
    PersonBasics | undefined
  >(selected)

  const personsWithExtraValues = persons.map((person) => {
    return { ...person, hide: false }
  })
  const [personsState, setPersonsState] = useState(personsWithExtraValues)
  const [sortData, setSortData] = useState({ type: 'priority', asc: false })

  useEffect(() => {
    if (sortData.type === 'name') {
      const personNames = personsState.map((person) => person.name)
      const personNamesOrdered = sortData.asc
        ? personNames.sort()
        : personNames.reverse()

      setPersonsState(
        personNamesOrdered.map(
          (name) => personsState.filter((person) => person.name === name)[0]
        )
      )
    }

    if (sortData.type === 'priority') {
      const personPriority = personsState.map((person) => person.priority)
      const personPriorityOrdered = personPriority.sort(
        (a, b) => (sortData.asc ? b : a) - (sortData.asc ? a : b)
      )

      setPersonsState(
        personPriorityOrdered.map(
          (priority) =>
            personsState.filter((person) => person.priority === priority)[0]
        )
      )
    }

    if (sortData.type === 'last') {
      const personLast = personsState.map((person) => person.last!.date)
      const personLastOrdered = personLast.sort(
        (a, b) =>
          Date.parse(sortData.asc ? b : a) - Date.parse(sortData.asc ? a : b)
      )

      setPersonsState(
        personLastOrdered.map(
          (date) =>
            personsState.filter((person) => person.last!.date === date)[0]
        )
      )
    }

    if (sortData.type === 'others') {
      const personOthers = personsState.map((person) => person.other!.date)
      const personOthersOrdered = personOthers.sort(
        (a, b) =>
          Date.parse(sortData.asc ? b : a) - Date.parse(sortData.asc ? a : b)
      )

      setPersonsState(
        personOthersOrdered.map(
          (date) =>
            personsState.filter((person) => person.other!.date === date)[0]
        )
      )
    }
  }, [sortData])

  const calcDays = (date: string) =>
    Math.floor(
      Math.abs((new Date() as any) - Date.parse(date)) / (1000 * 60 * 60 * 24)
    )

  const showMessagePastTime = (days: number) =>
    days < 1
      ? `Hace unas horas`
      : days === 1
      ? `Hace un día`
      : days > 1 && days < 30
      ? `Hace ${days} días`
      : days > 30 && days < 60
      ? `Hace un mes`
      : days >= 60
      ? `Hace ${Math.floor(days / 30)} meses`
      : ''

  return (
    <div className="md:w-48 min-w-fit">
      <Mask show={isDropdownOpened} onClickCallback={setIsDropdownOpened} />

      <button
        onClick={() => !disabled && setIsDropdownOpened(!isDropdownOpened)}
        className={`${
          !isDropdownOpened
            ? !disabled
              ? 'bg-slate-100'
              : 'bg-white'
            : 'bg-blue-300'
        } ${
          !disabled ? 'px-2' : 'cursor-default'
        } w-full font-medium rounded-md text-sm py-1 justify-end flex items-center cursor-default`}
        type="button"
      >
        <span className="h-5">{personSelected && personSelected.name}</span>
        {!disabled && (
          <VerticalArrowIcon direction={isDropdownOpened ? 'top' : 'bottom'} />
        )}
      </button>

      <div
        className={`${
          !isDropdownOpened && 'hidden'
        } z-30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl border border-slate-200 max-w-[90%] w-full md:w-2/3 lg:w-1/2 h-1/2 flex flex-col`}
      >
        <ul className="overflow-auto no-scrollbar px-7 pt-3 pb-2 text-sm font-normal text-gray-500 border-b text-left">
          <li>
            <div className="flex items-center">
              <div
                className="flex items-center w-full ml-5 rounded cursor-default"
                onClick={() =>
                  setSortData({ type: 'name', asc: !sortData.asc })
                }
              >
                {sortData.type === 'name' && (
                  <span className="mr-2">
                    <VerticalArrowIcon
                      direction={sortData.asc ? 'bottom' : 'top'}
                    />
                  </span>
                )}
                Nombre
              </div>

              <div
                className="flex items-center w-full ml-2 rounded cursor-default"
                onClick={() =>
                  setSortData({ type: 'priority', asc: !sortData.asc })
                }
              >
                {sortData.type === 'priority' && (
                  <span className="mr-2">
                    <VerticalArrowIcon
                      direction={sortData.asc ? 'bottom' : 'top'}
                    />
                  </span>
                )}
                Prioridad
              </div>

              <div
                className="flex items-center w-full ml-2 rounded cursor-default"
                onClick={() =>
                  setSortData({ type: 'last', asc: !sortData.asc })
                }
              >
                {sortData.type === 'last' && (
                  <span className="mr-2">
                    <VerticalArrowIcon
                      direction={sortData.asc ? 'bottom' : 'top'}
                    />
                  </span>
                )}
                Asignado
              </div>

              <div
                className="flex items-center w-full ml-2 rounded cursor-default"
                onClick={() =>
                  setSortData({ type: 'others', asc: !sortData.asc })
                }
              >
                {sortData.type === 'others' && (
                  <span className="mr-2">
                    <VerticalArrowIcon
                      direction={sortData.asc ? 'bottom' : 'top'}
                    />
                  </span>
                )}
                Otras asignaciones
              </div>
            </div>
          </li>
        </ul>

        <ul className="overflow-auto no-scrollbar flex-grow px-3 py-2 overflow-y-auto text-sm text-gray-700 text-left">
          {personsState.map(
            (person, key) =>
              !person.hide && (
                <li key={key}>
                  <div
                    className="flex items-center pl-2 rounded hover:bg-gray-100"
                    onClick={(e) => {
                      const ele = e.target as HTMLInputElement
                      if (ele.localName === 'input') {
                        setPersonSelected(
                          ele.checked ? personsState[key] : undefined
                        )
                        onClickCallback(
                          ele.checked ? personsState[key] : undefined
                        )
                      }
                    }}
                  >
                    <label className="flex w-full items-center">
                      <input
                        type="checkbox"
                        checked={person.name === personSelected?.name}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      />
                      <div className="w-full py-2 ml-4 text-sm font-medium text-gray-900 rounded">
                        {person.name}
                      </div>
                      <div className="w-full py-2 ml-4 text-sm font-medium text-gray-900 rounded">
                        {person.priority === 1 ? (
                          <span className="flex w-3 h-3 bg-blue-600 rounded-full"></span>
                        ) : person.priority === 2 ? (
                          <span className="flex w-3 h-3 bg-blue-400 rounded-full"></span>
                        ) : (
                          person.priority === 3 && (
                            <span className="flex w-3 h-3 bg-blue-200 rounded-full"></span>
                          )
                        )}
                      </div>
                      <div className="w-full py-2 ml-2 text-sm text-gray-900 font-normal rounded">
                        {showMessagePastTime(calcDays(person.last!.date))}
                      </div>
                      <div className="w-full py-2 ml-2 text-sm text-gray-900 font-normal rounded">
                        {showMessagePastTime(calcDays(person.other!.date))}
                      </div>
                    </label>
                  </div>
                </li>
              )
          )}
        </ul>

        <div className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full p-2 pl-10 text-sm text-gray-900 font-normal border border-gray-300 rounded-lg bg-white focus:outline-blue-300"
              placeholder="Buscar"
              onChange={(input) => {
                const value = input.target.value.toLowerCase()

                setPersonsState(
                  personsState.map((person) => {
                    const name = person.name.toLowerCase()

                    const found =
                      value.length < 3
                        ? name.startsWith(value)
                        : name.includes(value)

                    return { ...person, hide: found ? false : true }
                  })
                )
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectPerson
