import './App.css'
import './index.css'
import Login from './components/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './components/Error'
import Register from './components/Register'
import Home from './components/Home'
import ProtecedRoutes from './Services/ProtecedRoutes'


function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <Error />

    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <ProtecedRoutes />,
      children: [
        {
          path: "/home",
          element: <Home />
        }
      ]

    }, {
      path: "*",
      element: <Login />  
    }

  ])

  return (
    <>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  )
}

export default App
