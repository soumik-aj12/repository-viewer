import { useState } from "react";
import Search from "./Search";
import Queries from "./Queries";

function App() {
  const [query, setQuery] = useState("");
  const [repo, setRepo] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchData = async () => {
    try {
      setisLoading(true);
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );
      const data = await response.json();
      setRepo(data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center m-8">
      <Search query={query} setQuery={setQuery} onSearch={fetchData} />
      {isLoading ? (
        <div className="m-10">
          <button
            className="inline-block rounded-full bg-[#EE7214] text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] focus:bg-green-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-green-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
            type="button"
          >
            <div
              role="status"
              className="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            Loading
          </button>
        </div>
      ) : (
        <Queries repo={repo} />
      )}
    </div>
  );
}

export default App;
