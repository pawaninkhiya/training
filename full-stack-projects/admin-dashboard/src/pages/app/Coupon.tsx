import { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";
const Coupon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrifix] = useState<string>("");
  const [inculdeNumbers, setInculdeNumbers] = useState<boolean>(false);
  const [inculdeLetters, setInculdeLetters] = useState<boolean>(false);
  const [inculdeSymbols, setInculdeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");
 
  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inculdeLetters && !inculdeNumbers && !inculdeSymbols) {
      alert("Please select at least one option");
    }
    let result: string = prefix || "";
    const loopLength: number = size - result.length;
    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (inculdeLetters) entireString += allLetters;
      if (inculdeNumbers) entireString += allNumbers;
      if (inculdeSymbols) entireString += allSymbols;
      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };
  useEffect(()=>{
    setIsCopied(false)
  },[coupon])
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Coupon</h1>
        <section>
          <form action="" className="coupon-form" onSubmit={submitHandler}>
            <input
              type="text"
              value={prefix}
              placeholder="Text to inculde"
              onChange={(e) => setPrifix(e.target.value)}
            />
            <input
              type="number"
              value={size}
              placeholder="Coupan Length"
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            />

            <fieldset>
              <legend>Inculde</legend>
              <input
                type="checkbox"
                checked={inculdeNumbers}
                onChange={() => setInculdeNumbers((prev) => !prev)}
              />
              <span>Numbers</span>
              <input
                type="checkbox"
                checked={inculdeLetters}
                onChange={() => setInculdeLetters((prev) => !prev)}
              />
              <span>Numbers</span>
              <input
                type="checkbox"
                checked={inculdeSymbols}
                onChange={() => setInculdeSymbols((prev) => !prev)}
              />
              <span>Numbers</span>
            </fieldset>
            <button>Generate</button>
          </form>
          {coupon && (
            <code>
              {coupon}
              <span onClick={() => copyText(coupon)}>
                {isCopied ? "Copid" : "Copy"}
              </span>
            </code>
          )}
        </section>
      </main>
    </div>
  );
};

export default Coupon;
