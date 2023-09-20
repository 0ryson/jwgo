import { useState } from 'react'

interface Props {
  close?: React.ReactElement
  open?: React.ReactElement
}

const ToggleMenu: React.FC<Props> = ({ close, open }) => {
  const [openMenu, setOpenMenu] = useState(false)

  const toggle = () => {
    openMenu ? setOpenMenu(false) : setOpenMenu(true)
  }

  return (
    <div className="lg:hidden">
      <div onClick={toggle}>{openMenu ? close : open}</div>
    </div>
  )
}

export default ToggleMenu
