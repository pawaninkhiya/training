import axios from "axios";
import { useEffect, useState } from "react";

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
        setJokes(resp.data)
        console.log(jokes);
      } catch (error) {
        console.log(error);
      }
    };
    getJokes()
  }, []);
  return <div className="flex flex-col h-full w-[450px]  mx-auto mt-6 bg-gray-600 text-white p-8" >
    <h1 className="text-3xl mb-4  text-center">Programing Jokes 😁💕</h1>
    {
      jokes?.map((item: Jokes, i) => (
        <div className="" key={item.id}>
            <p className="p-2 mt-2 bg-red-300 w-full text-start">{item.punchline}</p>
            <p className="bg-blue-300 p-2 mt-2">{item.setup}</p>
        </div>
      ))
    }
  </div>;
};

export default App;
