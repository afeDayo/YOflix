import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useCustomParams = (data) => {
  const [searchParams] = useSearchParams();

  const [filteredMovies, setFilteredMovies] = useState([]);

  const searchInput = searchParams.get("search") ?? "";

  useEffect(() => {
    if (data) {
      const searchedMovies = data.filter((movie) => {
        return movie.title.toLowerCase().includes(searchInput.toLowerCase());
      });

      setFilteredMovies(searchedMovies);
    }
  }, [searchParams, data, searchInput]);

  return { searchInput, filteredMovies };
};
