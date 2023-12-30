import { useState } from "react";
import { Pagination } from "./pagination";
export default function Queries(props) {
  const { repo } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [queriesPerPage] = useState(4);
  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = repo.slice(indexOfFirstQuery, indexOfLastQuery);
  const [showPopup, setShowPopup] = useState(false);

  const handleCloneClick = (cloneUrl, event) => {
    event.preventDefault();
    navigator.clipboard.writeText(cloneUrl);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };
  const paginate = (pageNums) => setCurrentPage(pageNums);
  return (
    <>
      <div className="font-semibold m-6 grid grid-cols-2 gap-4 items-start">
        {showPopup && <div className="popup">Copied to clipboard</div>}
        {currentQueries.map((r) => (
          <div key={r.id} className="text-[#EE7214]">
            {/* {console.log(r)} */}
            <div className="transition ease-in-out delay-150 bg-white rounded-md p-4 hover:-translate-y-1 hover:scale-40 max-sm:flex max-sm:flex-col max-sm:shrink-0">
              <h2 className="font-extrabold">
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
                  <a
                    href={r.clone_url}
                    onClick={(event) => handleCloneClick(r.clone_url, event)}
                  >
                    Clone
                  </a>
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
