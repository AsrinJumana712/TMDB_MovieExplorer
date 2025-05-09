import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Paper, Box } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "user" && password === "123") {
      localStorage.setItem("user", JSON.stringify({ username }));
      navigate("/movie");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          color: "black",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ color: "#243b55" }}
        >
          Movie Explorer Login
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          align="center"
          sx={{ color: "#777" }}
        >
          Login to continue exploring movies.
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            label="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              backgroundColor: "#fafafa",
              padding: "5px",
              input: { fontSize: "0.875rem" },
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: "#fafafa",
              padding: "5px",
              input: { fontSize: "0.875rem" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#243b55",
              color: "#fff",
              padding: "0.5 rem",
              fontSize: "1.1 rem",
              borderRadius: "5px",
              "&:hover": { backgroundColor: "#1b2e47" },
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
