import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Tenant from './pages/Tenant';
import TenantPayment from './pages/TenantPayment';

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Outlet/>,
      children: [
        {path:'/', element: <Home/>},
        {path:'/login', element: <Login/>},
        {path:'/signup', element: <Signup/>},
        {path:'/tenant', element:<Tenant/>},
        {path:'/tenantPayment', element:<TenantPayment/>},
      ]
    }
  ])

  return (
    <UserContextProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </UserContextProvider>
  )
}

export default App
