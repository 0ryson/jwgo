import React from 'react'

interface Props {
  title?: string
  titleValue?: string | number
  subtitle?: string
  person?: React.ReactNode
}

export const MeetingRow = ({ title, titleValue, subtitle, person }: Props) => {
  return !title && !titleValue && !subtitle && !person ? (
    <></>
  ) : (
    <div className="flex flex-col md:flex-row mb-3 md:mb-1 justify-between font-light">
      {(title || titleValue) && (
        <div className="mb-1 md:mb-0">
          {title && <span>{title}</span>}
          {titleValue && <span className="ml-1 font-medium">{titleValue}</span>}
        </div>
      )}
      {(subtitle || person) && (
        <div className="flex flex-1 flex-col md:flex-row justify-end md:items-center">
          {subtitle && (
            <span className="mr-4 text-sm text-slate-500">{subtitle}</span>
          )}
          <div className="md:w-48 min-w-fit text-right text-sm font-medium">
            {person}
          </div>
        </div>
      )}
    </div>
  )
}
