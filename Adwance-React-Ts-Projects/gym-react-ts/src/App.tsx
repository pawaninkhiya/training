import Navbar from "@/scenes/navbar/Navbar"
import { useState } from "react"
import { SeletedPage } from "@/shared/type"
// enum SeletedPage


const App = () => {
  const [selectedPage,setSelectedPage]= useState<SeletedPage>(SeletedPage.Home)
  return (
    <div className="app text-gray-20 bg-gray-50">
      <Navbar setSelectedPage={setSelectedPage} selectedPage={selectedPage}/>
    </div>
  )
}

export default App
