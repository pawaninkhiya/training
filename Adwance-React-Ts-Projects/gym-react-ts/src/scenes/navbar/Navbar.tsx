// import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import logo from "@/assets/Logo.png"
import Link from "./Link";
import { SeletedPage } from "@/shared/type";
import useMediaQuery from "@/hooks/useMediaQuery"
import { useState } from "react";
import ActionButton from "@/shared/ActionButton";
type Props = {
    selectedPage: SeletedPage,
    setSelectedPage: (value: SeletedPage) => void
}



const Navbar = ({ selectedPage, setSelectedPage }: Props) => {
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
    let flexBetween = "flex justify-between items-center"
    return (
        <nav>
            <div className={`${flexBetween} fixed top-0 z-30 w-full py-6`}>
                <div className={`${flexBetween} w-5/6 mx-auto`}>
                    <div className={`${flexBetween} w-full gap-16`}>
                        <img src={logo} alt="logo" />
                        {
                            isAboveMediumScreens ? (<div className={`${flexBetween} w-full`}>
                                <div className={`${flexBetween} gap-8 text-sm`}>
                                    <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                                    <Link page="Benifits" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                                    <Link page="Our Classes" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                                    <Link page="Contact Us" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                                </div>
                                <div className={`${flexBetween} gap-8`}>
                                    <p>Sign In</p>

                                    <ActionButton setSelectedPage={setSelectedPage}>Become a Member</ActionButton >
                                </div>
                            </div>) : (
                                <div className="rounded-full bg-secondary-500 p-2 " onClick={() => setIsMenuToggled(!isMenuToggled)}>
                                    <Bars3Icon className="w-6 h-6 text-white" />
                                </div>
                            )
                        }

                    </div>
                </div>

            </div>
            {
                !isAboveMediumScreens && isMenuToggled && (
                    <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl">
                        <div className="flex justify-end p-12 ">
                            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                                <XMarkIcon className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>
                        <div className={`ml-[33%] flex flex-col gap-10 text-2xl`}>
                            <Link page="Home" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                            <Link page="Benifits" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                            <Link page="Our Classes" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                            <Link page="Contact Us" selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                        </div>
                    </div>
                )
            }
        </nav>
    )
}
export default Navbar;