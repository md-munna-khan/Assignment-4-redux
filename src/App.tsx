
import Footer from "./components/ui/layout/Footer"
import Navbar from "./components/ui/layout/Navbar"
import { Outlet } from "react-router"

function App() {
  return (
  <div className=" w-11/12 mx-auto">
    <Navbar/>
    <Outlet/>

   <div className="mt-20">
     <Footer/>
   </div>
  </div>
  )
}

export default App