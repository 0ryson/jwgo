import { useStore } from '@nanostores/react'
import { isSidebarOpen } from '../../stores/sidebar'
import { Mask } from '../molecules/Mask'

type Iprops = {
  children?: React.ReactNode
  copyright?: React.ReactElement
}

const Sidebar = ({ children, copyright }: Iprops) => {
  const $isSidebarOpen = useStore(isSidebarOpen)

  return (
    // Recordar la otra manera de escribir condicionales en los estilos (Midudev)
    <div
      className={`${
        !$isSidebarOpen && 'invisible'
      } absolute z-20 lg:static lg:visible h-full w-full min-w-min lg:max-w-[20%]`}
    >
      <Mask show={$isSidebarOpen} showCallback={isSidebarOpen.set} />

      <div className="flex flex-col z-20 px-6 lg:px-8 py-4 lg:py-6 relative w-2/3 sm:w-1/3 lg:w-full h-full break-words bg-white">
        <div className="flex-grow">{children}</div>
        {copyright}
      </div>
    </div>
  )
}

export default Sidebar
