import type { Person } from '../../types/persons'
import { useState, type HtmlHTMLAttributes } from 'react'
import { persons } from '../../../mocks/persons'
import { Mask } from './Mask'

interface Props {
  selected?: Person
  disabled?: boolean
  callback: (person: Person | undefined) => void
}

const SelectPerson = ({ selected, disabled = false, callback }: Props) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false)
  const [personSelected, setPersonSelected] = useState<Person | undefined>(
    selected
  )

  return (
    <div className="md:w-48 min-w-fit">
      <Mask show={isDropdownOpened} showCallback={setIsDropdownOpened} />

      <button
        onClick={() => !disabled && setIsDropdownOpened(!isDropdownOpened)}
        className={`${
          !isDropdownOpened
            ? !disabled
              ? 'bg-slate-100'
              : 'bg-white'
            : 'bg-lime-300'
        } ${
          !disabled ? 'px-2' : 'cursor-default'
        } w-full font-medium rounded-md text-sm py-1 justify-end flex items-center`}
        type="button"
      >
        <span className="h-5">{personSelected && personSelected.name}</span>
        {!disabled && (
          <svg
            className={`${isDropdownOpened && 'rotate-180'} w-2.5 h-2.5 ml-2.5`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        )}
      </button>

      <div
        className={`${
          !isDropdownOpened && 'hidden'
        } z-30 absolute mt-2 right-6 bg-white rounded-lg shadow-xl border border-slate-200 min-w-fit max-w-md w-full`}
      >
        <ul className="px-7 pt-3 pb-2 text-sm font-normal text-gray-500 border-b text-left">
          <li>
            <div className="flex items-center">
              <div className="w-full ml-5 rounded ">Nombre</div>
              <div className="w-full ml-2 rounded ">Última vez</div>
              {/* <div className="w-full ml-2 rounded ">
                Otras
              </div> */}
            </div>
          </li>
        </ul>

        <ul className="h-60 px-3 py-2 overflow-y-auto text-sm text-gray-700 text-left">
          {persons.map((person, key) => (
            <li key={key}>
              <div
                className="flex items-center pl-2 rounded hover:bg-gray-100"
                onClick={(e) => {
                  const ele = e.target as HTMLInputElement
                  if (ele.localName === 'input') {
                    setPersonSelected(ele.checked ? persons[key] : undefined)
                    callback(ele.checked ? persons[key] : undefined)
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
                  <div className="w-full py-2 ml-2 text-sm text-gray-900 rounded">
                    Hace 2 días
                  </div>
                </label>
              </div>
            </li>
          ))}
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
              id="input-group-search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Buscar"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectPerson
