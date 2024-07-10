import Navbar from "@/scenes/navbar/Navbar"
import { useEffect, useState } from "react"
import { SelectedPage } from "@/shared/type"
import Home from "@/scenes/home/Home"
import Benefits from "@/scenes/benefits/Benefits"
import OurClasses from "@/scenes/ourClasses/OurClasses"
import ContactUs from "@/scenes/contactUs/ContactUs"
// enum SelectedPage


const App = () => {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home)

  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="app text-gray-20 bg-gray-50">
      <Navbar isTopOfPage={isTopOfPage} setSelectedPage={setSelectedPage} selectedPage={selectedPage} />
      <Home setSelectedPage={setSelectedPage} />
      <Benefits setSelectedPage={setSelectedPage} />
      <OurClasses setSelectedPage={setSelectedPage} />
      <ContactUs setSelectedPage={{setSelectedPage }} />
    </div>
  )
}

export default App
