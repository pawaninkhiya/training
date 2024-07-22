// import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiFillFileText } from "react-icons/ai";
import {
    FaChartBar,
    FaChartLine,
    FaChartPie,
    FaGamepad,
    FaStopwatch,
} from "react-icons/fa";
// import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import {
    RiCoupon3Fill,
    RiDashboardFill,
    RiShoppingBag2Line,
    // RiShoppingBag3Fill,
} from "react-icons/ri";
import { Link, Location, useLocation } from "react-router-dom";
const AdminSidebar = () => {
    const location = useLocation();
    return (
        <aside>
            <h2>CD Admin</h2>
            <DivOne location={location} />
            <DivTwo location={location} />
            <DivThree location={location} />
        </aside>
    );
};

interface LiProps {
    url: string;
    text: string;
    location: Location;
    Icon: IconType;
}
const Li = ({ url, text, location, Icon }: LiProps) => {
    return (
        <li
            style={{
                backgroundColor: location.pathname.includes(url)
                    ? "rgba(0,155,255,0.1)"
                    : "white",
            }}
        >
            <Link to={url}>
                <Icon />
                {text}
            </Link>
        </li>
    );
};

const DivOne = ({ location }: { location: Location }) => (
    <div>
        <h5>Dashboard</h5>
        <ul>
            <Li
                url="/admin/dashboard"
                text="Dashboard"
                location={location}
                Icon={RiDashboardFill}
            />
            <Li
                url="/admin/product"
                text="Product"
                location={location}
                Icon={RiShoppingBag2Line}
            />
            <Li
                url="/admin/customer"
                text="Customer"
                location={location}
                Icon={IoIosPeople}
            />
            <Li
                url="/admin/transaction"
                text="Transaction"
                location={location}
                Icon={AiFillFileText}
            />
        </ul>
    </div>
)
const DivTwo = ({ location }: { location: Location }) => (
    <div>
        <h5>Charts</h5>
        <ul>
            <Li
                url="/admin/chart/bar"
                text="Bar"
                Icon={FaChartBar}
                location={location}
            />
            <Li
                url="/admin/chart/pie"
                text="Pie"
                Icon={FaChartPie}
                location={location}
            />
            <Li
                url="/admin/chart/line"
                text="Line"
                Icon={FaChartLine}
                location={location}
            />
        </ul>
    </div>
);

const DivThree = ({ location }: { location: Location }) => (
    <div>
        <h5>Apps</h5>
        <ul>
            <Li
                url="/admin/app/stopwatch"
                text="Stopwatch"
                Icon={FaStopwatch}
                location={location}
            />
            <Li
                url="/admin/app/coupon"
                text="Coupon"
                Icon={RiCoupon3Fill}
                location={location}
            />
            <Li
                url="/admin/app/toss"
                text="Toss"
                Icon={FaGamepad}
                location={location}
            />
        </ul>
    </div>
);


export default AdminSidebar;
