import axios from "axios";
import  { useEffect, useState } from "react";

type Jokes = {
  id: number;
  setup: string;
  punchline: string;
};
const App = () => {
  const [jokes, setJokes] = useState<Jokes[]>();
  useEffect(() => {
    const getJokes = async () => {
      try {
        const resp = await axios.get("http://localhost:3000/api/jokes")
        console.log(resp);
      } catch (error) {
        console.log(error);
      }
    };
    getJokes()
  },[]);
  return <div>App</div>;
};

export default App;
