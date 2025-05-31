
import Home from '../pages/home-page/Home'
import About from '../pages/about-page/About'
import Contact from '../pages/contact-page/Contact'
import Nav from './components/Nav'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Blogs from './components/Blogs'
import Services from './components/Services'
import NotFound from './components/NotFound'

const router=createBrowserRouter([
  {
    path:'/',
    element: 
      <div>
          <Nav name="reactRouter6"/>
          <Home/>
      </div>,
      children:[
        {path:'blogs',
          element:<Blogs/>
        },
        {path:'services',
          element:<Services/>
        }
      ]
  },{
    path:'/about',
    element:
      <div>
          <Nav name="reactRouter6"/>
          <About/>
      </div>
  },{
    path:'/contact',
    element:
      <div>
          <Nav name="reactRouter6"/>
          <Contact/>
      </div>
  },{
    path:'*',
    element:<NotFound/>
  }
])
function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
