import MovieCard from "../../components/MovieCard";
import Loading from "../../utils/Loading";

const SearchResult = ({ searchInput, filteredMovies, updateUI }) => {
  if (filteredMovies == null) return null;

  if (filteredMovies.length === 0) {
    return <p className="text-white">No results found for {searchInput}</p>;
  }

  return (
    <div className="mt-5 md:mt-[15px] md:ml-[25px] sm:mt-3 sm:ml-4">
      <h2 className="text-white text-xl font-normal md:text-2xl sm:text-2xl">
        Found {filteredMovies.length} result(s) for '{searchInput}'
      </h2>

      <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-[5px] mt-5">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} updateUI={updateUI} />
        ))}
      </div>

      {filteredMovies.length === 0 && <Loading message="Fetching results..." />}
    </div>
  );
};

export default SearchResult;
