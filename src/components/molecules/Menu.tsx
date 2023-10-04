import { isSidebarOpen } from '../../stores/sidebar'
import MeetingsIcon from '../atoms/icons/MeetingsIcon'

interface Props {
  HomeIcon?: React.ReactNode
  BoardIcon?: React.ReactNode
  MeetingsIcon?: React.ReactNode
  TerritoriesIcon?: React.ReactNode
}

interface Routes {
  url: string
  name: string
}

const routes: Routes[] = [
  {
    url: '',
    name: 'Inicio',
  },
  {
    url: 'board',
    name: 'Tablero',
  },
  {
    url: 'meetings',
    name: 'Reuniones',
  },
  {
    url: 'territories',
    name: 'Territorios',
  },
]

const Menu = ({
  HomeIcon = <></>,
  BoardIcon = <></>,
  TerritoriesIcon = <></>,
}: Props) => {
  const currentUrlPath = window.location.pathname

  return (
    <div className="py-4">
      <ul>
        {routes.map((route, key) => {
          console.log()
          return (
            <li
              className={`mb-3 text-md font-medium ${
                /* currentUrlPath === `/${route.url}` && 'text-blue-500' */
                currentUrlPath === `/meetings` &&
                route.url === 'meetings' &&
                'text-blue-500'
              }`}
              key={key}
            >
              <a
                href={`/${route.url}`}
                className="flex justify-start items-center"
                onClick={() => isSidebarOpen.set(false)}
              >
                <span className="pr-4">
                  {HomeIcon && route.url === '' && HomeIcon}
                  {BoardIcon && route.url === 'board' && BoardIcon}
                  {route.url === 'meetings' && (
                    <MeetingsIcon
                      strokeColor={`${
                        currentUrlPath === `/${route.url}`
                          ? 'rgb(59,130,246)'
                          : 'rgb(51 65 85)'
                      }`}
                    />
                  )}
                  {TerritoriesIcon &&
                    route.url === 'territories' &&
                    TerritoriesIcon}
                </span>
                <span>{route.name}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Menu
