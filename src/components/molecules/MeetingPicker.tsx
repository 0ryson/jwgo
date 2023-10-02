import { useEffect, useMemo, useState } from 'react'
import LeftIcon from '../atoms/icons/LeftIcon.tsx'
import RightIcon from '../atoms/icons/RightIcon.tsx'
import Datepicker from 'tailwind-datepicker-react'
import { Mask } from './Mask.tsx'

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
      'bg-lime-600 dark:bg-lime-600 text-white dark:text-white hover:bg-lime-500 dark:hover:bg-lime-500  hover:text-lime-50 dark:hover:text-lime-50',
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
  selectedDateCallback: (date: number) => void
}

export const MeetingPicker = ({ selectedDateCallback }: Props) => {
  const today = useMemo(() => new Date().setHours(0, 0, 0, 0), [])
  const [show, setShow] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<number>(today)

  const handleChange = (selectedDate: Date) => {
    const selectedDateNumber = selectedDate.setHours(0, 0, 0, 0)
    setSelectedDate(selectedDateNumber)
    selectedDateCallback(selectedDateNumber)
  }

  const handleClose = (state: boolean) => {
    setShow(state)
  }

  useEffect(() => {
    selectedDateCallback(selectedDate)
  }, [selectedDate])

  return (
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
                selectedDateCallback(previewWeek)
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
                const nextwWeek = currentDate.setDate(currentDate.getDate() + 7)
                setSelectedDate(nextwWeek)
                selectedDateCallback(nextwWeek)
              }}
              className="flex items-center justify-center px-4 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-md active:ring-4 active:ring-lime-300 active:relative active:z-10"
            >
              <RightIcon />
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
