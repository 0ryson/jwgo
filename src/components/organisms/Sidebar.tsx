import { useStore } from '@nanostores/react'
import { isSidebarOpen } from '../../stores/sidebar'

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
      } absolute z-10 lg:static lg:visible h-full w-full min-w-min lg:max-w-[20%]  border-slate-200`}
    >
      <div
        onClick={() => isSidebarOpen.set(false)}
        className={`${
          !$isSidebarOpen && 'invisible'
        } lg:invisible z-10 absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-slate-900 opacity-50`}
      ></div>
      <div className="flex flex-col z-20 px-8 py-6 relative w-2/3 sm:w-1/3 lg:w-full h-full break-words bg-white">
        <div className="flex-grow">{children}</div>
        {copyright}
      </div>
    </div>
  )
}

export default Sidebar
