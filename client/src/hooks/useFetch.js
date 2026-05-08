import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../utils/axiosConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useFetch = (url, token) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const config = {};
      if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
      }
      const response = await axiosInstance.get(url, config);

      setData(response.data?.data ?? response.data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [url, token]);

  const handleError = (err) => {
    if (err.message === "Network Error") {
      setError("Server is down, please refresh");
      return;
    }
    if (err.response?.status === 401) {
      toast.error("Login to view bookmarks", { id: "zcxcxzc" });
      navigate("/signin");
      return;
    }
    setError(err.response?.data?.message ?? "Something went wrong");
  };

  const toggleAddBookmark = (movieId, userId) => {
    if (!Array.isArray(data)) return;
    const updated = data.map((movie) =>
      movie._id === movieId
        ? {
            ...movie,
            bookmarkedBy: Array.from(
              new Set([...(movie.bookmarkedBy || []), userId]),
            ),
          }
        : movie,
    );
    setData(updated);
    toast.success("Movie Bookmarked", { id: "yycghj" });
  };

  const toggleRemoveBookmark = (movieId) => {
    if (!Array.isArray(data)) return;
    const updated = data.map((movie) =>
      movie._id === movieId ? { ...movie, bookmarkedBy: [] } : movie,
    );
    setData(updated);
    toast.success("Movie Removed", { id: "yhj" });
  };

  const handleAddBookmark = async (movieId, token, userId) => {
    if (!userId || !token) {
      toast.error("Login to Bookmark", { id: "oujg" });
      navigate("/signin");
      return;
    }
    try {
      toggleAddBookmark(movieId, userId);
      await axiosInstance.get(`/api/bookmark/add/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      toast.error("Failed to bookmark", { id: "aass" });

      fetchData();
    }
  };

  const handleRemoveBookmark = async (movieId, token) => {
    if (!token) {
      toast.error("Login to remove bookmark", { id: "no-token-remove" });
      navigate("/signin");
      return;
    }
    try {
      toggleRemoveBookmark(movieId);
      await axiosInstance.get(`/api/bookmark/remove/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      toast.error(err?.message ?? "Failed to remove bookmark", { id: "ooohj" });
      if (err.response?.status === 401) navigate("/signin");
      fetchData();
    }
  };

  const updateUI = (action, movieId, token, userId) => {
    if (action === "add") {
      handleAddBookmark(movieId, token, userId);
    } else {
      handleRemoveBookmark(movieId, token);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, updateUI };
};
