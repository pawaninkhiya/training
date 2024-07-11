import Logo from "@/assets/Logo.png"

type Props = {}

const Footer = (props: Props) => {
    return (
        <footer className="bg-primary-100 py-16">
            <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
                <div className="mt-16 basis-1/2 md:mt-0 ">
                    <img src={Logo} alt="logo" />
                    <p className="my-5 ">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestias labore sapiente ipsum nisi asperiores necessitatibus! Blanditiis laborum quod inventore maxime, necessitatibus odit voluptate,
                        incidunt ab corrupti, tempora ratione.</p>
                    <p>@ Evogym All Rights Resvered.</p>
                </div>
                <div className="mt-16 basis-1/4  md:mt-0">
                    <h4 className="font-bold">Links</h4>
                    <p className="my-5"> Massa orci senectus</p>
                    <p className="my-5"> Et devid id et etaim</p>
                    <p className="my-5">Lorem ipsum dolor sit.</p>
                </div>
                <div className="mt-16 basis-1/4  md:mt-0">
                    <h4 className="font-bold">Contect Us</h4>
                    <p>Ipsum dolor sit amet consectetur adipisicing.</p>
                    <p className="my-5">(237)-354-236</p>
                   
                </div>
            </div>
        </footer>
    )
}

export default Footer