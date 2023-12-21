import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { UserContext, UserContextProvider } from './context/UserContext'
import Home from './pages/Home'
import Signup from './pages/Signup';
import Tenant from './pages/Tenant';
import TenantPayment from './pages/TenantPayment';
import OwnerPropertyDetail from './pages/OwnerPropertyDetail';
import { PropertyProvider } from './context/PropertyContext';
import Layout from './components/layout/Layout';
import CreateResident from './pages/CreateResident';

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
        {path:'/property/:propertyId', element:<OwnerPropertyDetail/>},
        {path:'/createResident', element:<CreateResident/>},
      ]
    }
  ])

  return (
    <UserContextProvider>
      <PropertyProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </PropertyProvider>
    </UserContextProvider>
  )
}

export default App
