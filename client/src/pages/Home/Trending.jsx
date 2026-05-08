import Loading from "../../utils/Loading";
import MovieCarousel from "./MovieCarousel";
// Trending.jsx

const Trending = ({ data, error, loading, updateUI }) => {
  if (loading) {
    return <Loading message="Fetching Trending Movies..." />;
  }

  if (error) {
    return <p>{error}: Please try again later.</p>;
  }
  return (
    <div>
      <MovieCarousel data={data} updateUI={updateUI} />
    </div>
  );
};

export default Trending;
