type Props = {
  title?: string
  onClickCallback?: () => void
}

const ToggleSwitch = ({ title, onClickCallback }: Props) => {
  return (
    <label className="relative inline-flex items-center w-full cursor-default">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onClick={onClickCallback}
      />
      <div className="relative w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-400"></div>
      <span className="w-full ml-3 text-sm font-medium text-gray-900">
        {title}
      </span>
    </label>
  )
}

export default ToggleSwitch
