import MovieCard from "../../components/MovieCard";
import Loading from "../../utils/Loading";

const Recommended = ({ data, error, loading, updateUI }) => {
  if (loading) {
    return <Loading message="Fetching Recommended Movies..." />;
  }

  if (error) {
    return <p>{error}: Please try again later</p>;
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-2 w-full">
      {data.map((movie) => {
        return <MovieCard key={movie._id} movie={movie} updateUI={updateUI} />;
      })}
    </div>
  );
};

export default Recommended;
