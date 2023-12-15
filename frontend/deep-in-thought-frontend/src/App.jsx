import './App.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Outlet/>,
      children: [
        {path:'/', element: <Home/>},
        {path:'/login', element: <Login/>},
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
