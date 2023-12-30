export default function Search(props) {
  const { query, setQuery, onSearch } = props;
  const handleSub = (e) => {
    e.preventDefault();
    onSearch();
  };
  return (
    <>
      <div className="mx-auto font-semibold p-4 shadow-md shadow-[#1B4242]/30  max-sm:h-30 max-sm:text-nowrap">
        <h2 className="font-bold text-[#EE7214] text-[3rem] max-sm:text-2xl">
        Search a Github Repository
        </h2>
        <div className="flex justify-center">
          <form onSubmit={handleSub}>
            <input
              type="text"
              name="search"
              className="w-64 h-10 border-2 border-[#EE7214] rounded"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="text-white bg-[#EE7214] border-solid border-2 border-[#EE7214] rounded m-2 p-2 shadow-md">Search</button>
          </form>
        </div>
      </div>
    </>
  );
}
