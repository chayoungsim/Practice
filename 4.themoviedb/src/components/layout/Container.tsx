import { Outlet } from 'react-router-dom';

const Container = () => {
  return (
    <div id="container">        
        <Outlet />
    </div>
  )
}

export default Container