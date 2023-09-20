import { useState } from 'react'

type Iprops = {
  children?: React.ReactNode
}

const Sidebar = ({ children }: Iprops) => {
  const [openMenu, setOpenMenu] = useState(false)

  const toggle = () => {
    openMenu ? setOpenMenu(false) : setOpenMenu(true)
  }

  return (
    // Recordar la otra manera de escribir condicionales en los estilos (Midudev)
    <div
      className={`${
        !openMenu && 'hidden'
      } absolute z-10 lg:static lg:block h-full w-full min-w-min lg:max-w-[20%] border-r border-slate-200`}
    >
      <div
        onClick={toggle}
        className={`${
          !openMenu && 'hidden'
        } lg:hidden z-10 absolute top-0 right-0 bottom-0 left-0 w-full h-full bg-slate-900 opacity-50`}
      ></div>
      <div className="z-20 px-8 py-6 relative w-min h-full break-words bg-white">
        {children}
      </div>
    </div>
  )
}

export default Sidebar
