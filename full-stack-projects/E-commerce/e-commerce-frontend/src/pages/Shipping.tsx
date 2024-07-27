import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const Shipping = () => {
  const [shipingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: " ",
    country: "",
    pinCode: "",
  });
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="shipping">
      <button className="back-btn">
        <BiArrowBack />
      </button>
      <form>
        <h1>SIPPING ADDRESS</h1>
        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shipingInfo.address}
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          placeholder="City"
          name="city"
          value={shipingInfo.city}
          onChange={changeHandler}
        />
        <input
          required
          type="text"
          placeholder="State"
          name="state"
          value={shipingInfo.state}
          onChange={changeHandler}
        />
        <select
          name="country"
          required
          value={shipingInfo.country}
          onChange={changeHandler}
        >
          <option value="1">India</option>
          <option value="1">Japan</option>
          <option value="1">Pakistan</option>
          <option value="1">Austelia</option>
        </select>
        <input
          required
          type="text"
          placeholder="PinCode"
          name="pinCode"
          value={shipingInfo.pinCode}
          onChange={changeHandler}
        />
        <button>Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
