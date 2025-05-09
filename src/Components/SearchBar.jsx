import React from "react";
import { Button, TextField, Box } from "@mui/material";

function SearchBar({ query, setQuery, onSearch}) {
    const handleKeyPress = (e) => {
        if (e.key === "Enter") onSearch();
    };

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mt={2}
      >
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for movies..."
          variant="outlined"
          sx={{
            width: "280px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            input: {
              padding: "10px",
            },
          }}
        />

        <Button
          onClick={onSearch}
          variant="contained"
          sx={{
            backgroundColor: "#243b55",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1b2e47",
            },
            borderRadius: "8px",
            padding: "10px 20px",
            textTransform: "none",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
          }}>Search</Button>
      </Box>
    );
}
export default SearchBar;