import { isSidebarOpen } from '../../stores/sidebar'

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
  MeetingsIcon = <></>,
  TerritoriesIcon = <></>,
}: Props) => {
  return (
    <div className="py-4">
      <ul>
        {routes.map((route, key) => {
          return (
            <li className="mb-3 text-md font-medium" key={key}>
              <a
                href={`/${route.url}`}
                className="flex justify-start items-center"
                onClick={() => isSidebarOpen.set(false)}
              >
                <span className="pr-4">
                  {HomeIcon && route.url === '' && HomeIcon}
                  {BoardIcon && route.url === 'board' && BoardIcon}
                  {MeetingsIcon && route.url === 'meetings' && MeetingsIcon}
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
