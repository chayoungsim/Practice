import { Link } from 'react-router-dom'
import { routes } from "../../routes/router"
import './Header.scss'
import netflexLogo from '../../assets/netflex.svg'
import SearchBox from '../common/SearchBox'

const Header = () => {
  const navItems = routes[0].children?.filter((route) => route.handle?.title) ?? []
  // ? : children이 있으면 filter를 실행하고 없으면 undefined를 반환한다
  // filter는 조건에 맞는 것만 남깁니다.
  // ?? null 또는 undefined이면 빈 배열을 사용한다.

  return (
    <header id="header">
      <div className="static">
        <h1 className="logo">
          <Link to="/"><img src={netflexLogo} alt="NetFlex" /></Link>
        </h1>
        <nav>
          <ul className="gnb">
            {navItems.map((route) => (
              <li key={route.path}>
                <Link to={`/${route.path}`}>{route.handle?.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="search">
            <SearchBox />
        </div>
      </div>
    </header>
  )
}

export default Header