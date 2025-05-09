import React, { useEffect, useState } from "react";
import { useMovieContext } from "../Context/Context";
import SearchBar from "../Components/SearchBar";
import MovieCard from "../Components/MovieCard";
import Trending from "../Components/Trending";
import tmdb from "../api/tmdb";
import {Box, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from "@mui/material";

function MoviePage() {
  const { movies, fetchMovies, lastSearch, setLastSearch } = useMovieContext();
  const [query, setQuery] = useState(lastSearch || "");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

    useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await tmdb.get("/genre/movie/list");
        setGenres(response.data.genres);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      fetchMovies(query);
    } else {
      fetchMovies("popular");
    }
  }, [query, fetchMovies]);

  const handleSearch = () => {
    if (query.trim()) {
      setLastSearch(query);
      fetchMovies(query);
    }
  };

   const filteredMovies = movies.filter((movie) => {
    const genreMatch = selectedGenre ? movie.genre_ids.includes(parseInt(selectedGenre)) : true;
    const yearMatch = selectedYear ? movie.release_date.startsWith(selectedYear) : true;
    const ratingMatch = selectedRating ? movie.vote_average >= parseFloat(selectedRating) : true;
    return genreMatch && yearMatch && ratingMatch;
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#333" }}>
          Explore Movies
        </Typography>
        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: 4 }}>
        <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Genre</InputLabel>
            <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            label="Genre">
                <MenuItem value="">All Genres</MenuItem>
                {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
            ))}
            </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Year</InputLabel>
            <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Year">
                <MenuItem value="">All Years</MenuItem>
                {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
            </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Rating</InputLabel>
            <Select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            label="Rating">
                <MenuItem value="">All Ratings</MenuItem>
                {[8, 7, 6, 5, 4].map((rating) => (
                <MenuItem key={rating} value={rating}>{rating}+ ⭐</MenuItem>
            ))}
            </Select>
        </FormControl>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "600",
            marginBottom: 2,
            marginLeft: 20,
            color: "#444",
          }}
        >
          Results{" "}
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))
          ) : (
            <Typography>No movies match your filters.</Typography>
          )}
        </Grid>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Trending />
      </Box>
    </Box>
  );
}

export default MoviePage;

