import { Outlet } from 'react-router-dom'
import NavMenu from './NavMenu'
import '../../styles/guard/guardStyles.css'

const GuardLayout = () => {
  return (
    <div className="guard-layout">
      <div className="guard-background"></div>
      
      <header className="guard-header">
        <h1>Módulo de Guardianía</h1>
        <NavMenu />
      </header>

      <main className="guard-main">
        <Outlet />
      </main>
    </div>
  )
}

export default GuardLayout
