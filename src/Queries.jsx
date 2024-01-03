import { useState } from "react";
import { Pagination } from "./pagination";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Queries(props) {
  const { repo } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [queriesPerPage] = useState(4);
  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = repo.slice(indexOfFirstQuery, indexOfLastQuery);

  const [copied, setCopied] = useState(null);
  const handleCopy = (id) => {
    setCopied(id);
    setTimeout(() => {
      setCopied(null);
    }, 1000);
  };

  const paginate = (pageNums) => setCurrentPage(pageNums);
  return (
    <>
      <div className="font-semibold m-6 grid grid-cols-2 gap-4 items-start">
        {currentQueries.map((r) => (
          <div key={r.id} className="text-[#EE7214]">
            {/* {console.log(r)} */}
            <div className="transition ease-in-out delay-150 bg-white rounded-md p-4 hover:-translate-y-1 hover:scale-40 max-sm:flex max-sm:flex-col max-sm:shrink-0">
              <h2 className="font-extrabold overflow-x-auto whitespace-nowrap">
                {r.name} - {r.owner.login}
              </h2>
              <span className="max-sm:overflow-x-auto max-sm:whitespace-nowrap">
                {r.description}
              </span>
              <div className="flex justify-between max-sm:flex max-sm:flex-col">
                <p className="font-bold">
                  Language:- <span>{r.language}</span>
                </p>
                <p className="font-bold">
                  Stars:- <span>{r.stargazers_count}</span>
                </p>
                <p className="font-bold">
                  <a href={r.html_url}>Visit</a>
                </p>
                <p className="font-bold">
                  <CopyToClipboard
                    text={r.clone_url}
                    onCopy={()=>handleCopy(r.id)}
                  >
                    <button className="relative hover:bg-orange-600 hover:text-zinc-50 hover:border-4 hover:border-orange-600 hover:p-0.1 hover:rounded-md" >Clone</button>
                  </CopyToClipboard>

                  {copied === r.id ? (
                    <span className="transition delay-150 bg-orange-600 absolute bottom-3 right-1 border-4 border-orange-600 rounded-md text-zinc-50 text-sm">Copied!</span>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Pagination
          queriesPerPage={queriesPerPage}
          totalQueries={repo.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}
