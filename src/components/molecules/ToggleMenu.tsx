import { useStore } from '@nanostores/react'
import { isSidebarOpen } from '../../stores/sidebar'

interface Props {
  close?: React.ReactElement
  open?: React.ReactElement
}

const ToggleMenu: React.FC<Props> = ({ close, open }) => {
  const $isSidebarOpen = useStore(isSidebarOpen)

  return (
    <div className="lg:hidden">
      <div onClick={() => isSidebarOpen.set(!$isSidebarOpen)}>
        {$isSidebarOpen ? close : open}
      </div>
    </div>
  )
}

export default ToggleMenu
