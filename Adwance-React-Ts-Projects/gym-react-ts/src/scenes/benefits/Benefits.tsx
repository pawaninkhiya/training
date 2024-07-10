import { BenefitType, SelectedPage } from "@/shared/type"
import { HomeModernIcon, UserGroupIcon, AcademicCapIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import HText from "../../shared/HText"
import BenefitsItem from "./BenefitsItem"
import ActionButton from "@/shared/ActionButton"
import BenefitsPageGraphic from "@/assets/BenefitsPageGraphic.png"

type Props = {
    setSelectedPage: (value: SelectedPage) => void
}

const benefits: Array<BenefitType> = [
    {
        icon: <HomeModernIcon className="h-6 w-6" />,
        title: "State of the Art Facilities",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, nemo dicta inventore architecto voluptas voluptate fugit."
    },
    {
        icon: <UserGroupIcon className="h-6 w-6" />,
        title: "100's of Diverse Classes",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, nemo dicta inventore architecto voluptas voluptate fugit."
    },
    {
        icon: <AcademicCapIcon className="h-6 w-6" />,
        title: "Expert and Pro Trainers",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, nemo dicta inventore architecto voluptas voluptate fugit."
    },
]

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 }
    }
}

function Benefits({ setSelectedPage }: Props) {
    return (
        <section id="banefits" className="mx-auto min-h-full w-5/6 py-20 md:mt-12">
            <motion.div
                onViewportEnter={() => setSelectedPage(SelectedPage.Benifits)}
            >
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 }
                    }}
                >
                    <HText >
                        More THAN JUST GYM.
                    </HText>
                    <p className="my-5 text-sm">
                        We provide world class fitness equipment, trainers and classes to
                        get you to your ultimate fitness goals with ease. We provide true
                        care into each and every member.
                    </p>
                </motion.div>
                <motion.div className=" items-center justify-center gap-8 md:flex mt-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={container}
                >
                    {
                        benefits.map((benefit: BenefitType) => (
                            <BenefitsItem key={benefit.title} icon={benefit.icon} title={benefit.title} description={benefit.description} setSelectedPage={setSelectedPage} />

                        ))
                    }
                </motion.div>
                {/* graphic and Description */}
                <div className="mt-16 justify-center items-center gap-20 md:mt-20 md:flex">
                    {/* Graphic */}
                    <img className="mx-auto" src={BenefitsPageGraphic} alt="benifits-page-graphic" />
                    <div className="">
                        <img src="" alt="" />
                        {/* Description */}
                        <div className="">
                            {/* Title */}
                            <div className="relative">
                                <div className="before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves">
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5 }}
                                        variants={{
                                            hidden: { opacity: 0, x: 50 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                    >
                                        <HText>
                                            MILLIONS OF HAPPY MEMBERS GETTING{" "}
                                            <span className="text-primary-500">FIT</span>.
                                        </HText>
                                    </motion.div>
                                </div>
                            </div>
                            {/* Description */}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                variants={{
                                    hidden: { opacity: 0, x: -50 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                            >
                                <p className="my-5">   Nascetur aenean massa auctor tincidunt. Iaculis potenti amet
                                    egestas ultrices consectetur adipiscing ultricies enim. Pulvinar
                                    fames vitae vitae quis. Quis amet vulputate tincidunt at in
                                    nulla nec. Consequat sed facilisis dui sit egestas ultrices
                                    tellus. Ullamcorper arcu id pretium sapien proin integer nisl.
                                    Felis orci diam odio.</p>
                                <p className="mb-5">Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est
                                    tellus quam porttitor. Mauris velit euismod elementum arcu neque
                                    facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit
                                    enim mattis odio in risus nunc.</p>
                            </motion.div>
                            {/* Button */}
                            <div className="relative mt-16">
                                <div className="before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles">
                                    <ActionButton setSelectedPage={setSelectedPage}>Join Now</ActionButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default Benefits