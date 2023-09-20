import { useState } from 'react'

interface Props {
  close: JSX.Element
  open: JSX.Element
}

const ToggleMenu: React.FC<Props> = ({ close, open }) => {
  const [openMenu, setOpenMenu] = useState(true)

  const toggle = () => {
    openMenu ? setOpenMenu(false) : setOpenMenu(true)
  }

  return (
    <div>
      <div className="lg:invisible" onClick={toggle}>
        {openMenu ? close : open}
      </div>
    </div>
  )
}

export default ToggleMenu
