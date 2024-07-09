import AnchorLink from "react-anchor-link-smooth-scroll"
import { SeletedPage } from "./type"

type Props = {
    children: React.ReactNode,
    setSelectedPage: (value: SeletedPage) => void
}
const ActionButton = ({ children, setSelectedPage }: Props) => {
    return (
        <AnchorLink className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
            onClick={() => setSelectedPage(SeletedPage.ContactUs)} href={`#${SeletedPage.ContactUs}`}>
            {children}
        </AnchorLink>
    )
}
export default ActionButton