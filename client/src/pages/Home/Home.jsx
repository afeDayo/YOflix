import { useCustomParams } from "../../hooks/useCustomParams";
import { useFetch } from "../../hooks/useFetch";
import Loading from "../../utils/Loading";
import Recommended from "./Recommended";
import SearchResult from "./SearchResult";
import Trending from "./Trending";

const Home = () => {
  const { data, error, loading, updateUI } = useFetch("/api/movie");
  const { searchInput, filteredMovies } = useCustomParams(data);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-3xl text-white">{error}: Kindly Refresh</p>;
  }

  if (searchInput) {
    return (
      <SearchResult
        searchInput={searchInput}
        filteredMovies={filteredMovies}
        updateUI={updateUI}
      />
    );
  }

  return (
    <div className="mt-[12px] md:mt-[15px] lg:mt-[20px] mx-2.5 sm:mx-4">
      <div className="tred-body">
        <h2 className="m-0 text-start text-[#ffffff] text-[20px] md:text-[32px] font-normal trend">
          Trending
        </h2>
        <Trending {...{ data, error, loading, updateUI }} />
      </div>

      <div className="main-body mt-[40px]">
        <h2 className="m-0 text-start text-[#ffffff] text-[20px] md:text-[32px] font-normal reco">
          Recommended For You
        </h2>
        <Recommended {...{ data, error, loading, updateUI }} />
      </div>
    </div>
  );
};

export default Home;
