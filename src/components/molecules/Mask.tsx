interface Props {
  show: boolean
  onClickCallback: (action: boolean) => void
}

export const Mask = ({ show, onClickCallback }: Props) => {
  return (
    <div
      className={`mask ${
        !show && 'hidden'
      } z-20 fixed top-0 left-0 w-full h-full bg-slate-800 opacity-50`}
      onClick={() => onClickCallback(false)}
    ></div>
  )
}
