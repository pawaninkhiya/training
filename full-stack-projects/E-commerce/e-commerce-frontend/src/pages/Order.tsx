import { ReactElement, useState } from "react";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { Link } from "react-router-dom";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Order = () => {
  const [rows, setRows] = useState<DataType[]>([
    {
      _id: "wqjejkenanbda",
      amount: 100,
      quantity: 2,
      discount: 10,
      status: <span className="green">Processing</span>,
      action: <Link to={`/order/wqjejkenanbda`}>View</Link>,
    },
  ]);
  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  );
  return (
    <div className="cantainer">
      <h1>My Orders</h1>
      <div>{Table()}</div>
    </div>
  );
};

export default Order;
