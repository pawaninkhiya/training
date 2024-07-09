
import { SeletedPage } from '@/shared/type'
import AnchorLink from 'react-anchor-link-smooth-scroll'

type Props = {
    page:string
    selectedPage:SeletedPage,
    setSelectedPage : (value:SeletedPage)=>void
}

const Link = ({page,selectedPage,setSelectedPage}: Props) => {
    let lowerCasePage = page.toLowerCase().replace(/ /g, "") as SeletedPage
  return (
    <AnchorLink
      className={`${selectedPage === lowerCasePage ? "text-primary-500" : ""}
        transition duration-500 hover:text-primary-300
      `}
      href={`#${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
    </AnchorLink>
  )
}

export default Link