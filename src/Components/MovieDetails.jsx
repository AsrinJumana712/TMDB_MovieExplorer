import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdb from "../api/tmdb";
import { Box, Typography, Paper, CircularProgress, Link } from "@mui/material";

function MovieDetails() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const [movieRes, creditsRes, videosRes] = await Promise.all([
                    tmdb.get(`/movie/${id}`),
                    tmdb.get(`/movie/${id}/credits`),
                    tmdb.get(`/movie/${id}/videos`),
                ]);

                console.log("Movie Data:", movieRes.data);
                console.log("Credits Data:", creditsRes.data);
                console.log("Videos Data:", videosRes.data);

                setMovieDetails(movieRes.data);
                setCast(creditsRes.data.cast.slice(0, 5));

                const trailerVideo = videosRes.data.results.find(
                    (video) => video.type === "Trailer" && video.site === "YouTube"
                );
                setTrailer(trailerVideo?.key || null);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch movie details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [id]);

    if (loading)
        return(
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress/>
            </Box>
    );

    if (error) return <Typography color="error">{error}</Typography>;
    if (!movieDetails) return <Typography>Movie not found.</Typography>;

    const {title, overview, genres, poster_path } = movieDetails;

    return (
        <Paper elevation={3} sx={{
            padding: 4,
            margin: 4,
            borderRadius: 3,
            backgroundColor: "#f8f9fa",
      }}>
        <Box 
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={4}
            mb={4}>

          <Box component="img"
          src={`https://image.tmdb.org/t/p/w342${poster_path}`} 
          alt={title}
          sx={{
            width: { xs: "100%", md: 250 },
            borderRadius: 2,
            boxShadow: 3,
          }}/>

          <Box flex={1}>
            <Typography variant="h4" gutterBottom>{title}</Typography>
            <Typography variant="body1" paragraph><strong>Overview:</strong> {overview}</Typography>
            <Typography variant="body1"><strong>Genres:</strong>{" "}{genres && genres.map((g) => g.name).join(", ")}</Typography>
          </Box>
        </Box>

        <Typography variant="h5" gutterBottom>Cast:</Typography>
        <Box component="ul" sx={{ pl: 2, mb: 3 }}>
            {cast.length ? (
                cast.map((actor) => (
                    <Box key={actor.id} component="li" sx={{ mb: 1 }}>
                        <Typography variant="body2" component="span" sx={{ verticalAlign: "middle" }}> {actor.name}</Typography>
                    </Box>
                ))
            ): (
                <Typography variant="body2">No cast info available</Typography>
            )}
        </Box>

        {trailer ? (
            <Box>
                <Typography variant="h6" gutterBottom> Trailer: </Typography>
                <Link
                    href={`https://www.youtube.com/watch?v=${trailer}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ fontWeight: "bold", color: "#243b55" }}>Watch Trailer</Link>
            </Box>

        ) :(
            <Typography>No trailer available.</Typography>
        )}
      </Paper>
    );
}
export default MovieDetails;