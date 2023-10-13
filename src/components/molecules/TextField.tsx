import { useState } from 'react'

interface Props {
  text: string
  disabled?: boolean
  onBlurCallback: (text: string | undefined) => void
}

const TextField = ({ text = '', disabled = false, onBlurCallback }: Props) => {
  const [inputText, setInputText] = useState<string>(text)

  return (
    <div className="md:w-48 min-w-fit">
      <input
        onChange={(ele) => setInputText(ele.target.value)}
        onBlur={() => onBlurCallback(inputText)}
        className={`${
          !disabled ? 'px-2 bg-slate-100' : 'cursor-default bg-white'
        } w-full font-medium text-right rounded-md text-sm py-1 justify-end flex items-center focus:bg-blue-200 focus:outline-none`}
        value={inputText}
      />
    </div>
  )
}

export default TextField
