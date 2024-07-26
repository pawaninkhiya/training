import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [gender, setGender] = useState<string>("");
  const [date, setDate] = useState<string>("");
  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female </option>
          </select>
        </div>
        <div>
          <label htmlFor="gender">Date</label>
          <input type="date" value={date} onChange={(e) => e.target.value} />
        </div>

        <div>
          <p>Already Signed In Once</p>
          <button>
            <FcGoogle /> <span> Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
