import { ReactElement, useCallback, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

interface DataType {
  id: number;
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}
const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
const arr: DataType[] = [
  {
    id: 1,
    name: "Mackbook",
    price: 232223,
    stock: 23,
    photo: (
      <img
        src="https://images.unsplash.com/photo-1617472592135-72a181d04b27?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="photo"
      />
    ),
    action: <Link to={`/admin/product/1`}>Manage </Link>,
  },
  {
    id: 2,
    name: "Puma Shoes",
    price: 2323,
    stock: 60,
    photo: (
      <img
        src="https://images.unsplash.com/photo-1715691873555-4569d07959b1?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="photo"
      />
    ),
    action: <Link to={""}>Manage </Link>,
  },
];
const Product = () => {
  const [data, setData] = useState<DataType[]>(arr);
  const Table = useCallback(
    TableHOC<DataType>(columns, data, "dashboard-product-box", "Products",true),
    []
  );

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
      <Link className="create-product-btn" to={"/admin/product/new"}>
        <FaPlus />
      </Link>
    </div>
  );
};

export default Product;
