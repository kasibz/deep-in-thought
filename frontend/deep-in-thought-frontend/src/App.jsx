import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import Home from './pages/Home'
import Signup from './pages/Signup';
import Tenant from './pages/Tenant';
import TenantPayment from './pages/TenantPayment';
import OwnerPropertyDetail from './pages/OwnerPropertyDetail';
import { PropertyProvider } from './context/PropertyContext';
import Layout from './components/layout/Layout';

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout><Outlet/></Layout>,
      children: [
        {path:'/', element: <Home/>},
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
