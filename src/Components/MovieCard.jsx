import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function MovieCard({movie}) {
    return (
      <Card
        sx={{
          width: 300,
          height: "600px",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
        }}
      >
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            component="img"
            height="400"
            image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title || "Movie poster"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "fallback-image.jpg";
            }}
          />

          <CardContent sx={{ backgroundColor: "#fff" }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#333" }}>
              {movie.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              {" "}
              Year: {movie.release_date?.slice(0, 4)}
            </Typography>
            <Typography variant="body2" sx={{ color: "#555" }}>
              Rating: {movie.vote_average}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    );
    
}
export default MovieCard;