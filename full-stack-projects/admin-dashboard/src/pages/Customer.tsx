import { ReactElement, useCallback, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";

import { FaTrash } from "react-icons/fa";

interface DataType {
  avatar: ReactElement;
  name: string;
  gender: string;
  email: string;
  role: string;
  action: ReactElement;
}
const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const arr: DataType[] = [
  {
    avatar: (
      <img src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{
        borderRadius:"50%"
      }} />
    ),
    name: "John Doe",
    gender: "Male",
    email: "john.doe@gmail.com",
    role: "Admin",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" style={{
        borderRadius:"50%"
      }} />
    ),
    name: "Divya",
    gender: "Female",
    email: "divya@gmail.com",
    role: "Admin",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];
const Customer = () => {
  const [data] = useState<DataType[]>(arr);
  const Table = useCallback(
    TableHOC(columns, data, "dashboard-product-box", "Customer", true),
    []
  );
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table()}</main>
    </div>
  );
};

export default Customer;
