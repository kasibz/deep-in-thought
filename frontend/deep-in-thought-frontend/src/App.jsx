import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import Home from './pages/Home'
import Signup from './pages/Signup';
// import AbcIcon from '@mui/icons-material/Abc';
function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Outlet/>,
      children: [
        {path:'/', element: <Home/>},
        {path:'/signup', element: <Signup/>},
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
