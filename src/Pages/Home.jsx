import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Paper } from "@mui/material";

function Home() {
    const navigate = useNavigate();

    return (
        <Box sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to right, #141e30, #243b55)",
            color: "white",
            textAlign: "center",
        }}>

        <Paper elevation={10} sx={{
            maxWidth: "600px",
            padding: "2rem",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
            }}
        >

        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Welcome to Movie Explorer </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: "white" }}>
          Discover trending movies, search your favorites, and get detailed
          information all in one place.
        </Typography>
        <Button variant="contained"
          color="primary"
          sx={{
            padding: "0.5rem 2rem",
            borderRadius: "5px",
            fontSize: "1.1rem",
            marginTop: "1rem",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
          onClick={() => navigate("/login")}>Login</Button>
        </Paper>
    </Box>
    );
}

export default Home;