import React, { createContext, useState, useContext, Children }from "react";
import tmdb from "../api/tmdb";

//Create context
export const Context = createContext();

//Provider component
export const ContextProvider = ({children}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem("favorites");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    const [lastSearch, setLastSearch] = useState(() => {
        return localStorage.getItem("lastSearch") || "";
    });

    const fetchMovies = async (query) => {
        setLoading(true);
        setError(null);
        try{
            const response = await tmdb.get("/search/movie", {
                params: {query},
            });
            setMovies(response.data.results);
        } catch (err) {
            console.error("Failed to fetch movies:", err);
            setError(err.message || "An error occured");
        } finally {
            setLoading(false);
        }
    };

    const clearMovies = () => {
        setMovies([]);
        setError(null);
    };

    const addFavorites = (movie) => {
        const updateFavorites = [...favorites, movie];
        setFavorites(updateFavorites);
        localStorage.setItem("favorites", JSON.stringify(updateFavorites));
    };

    const removeFavorites = (id) => {
        const updateFavorites = favorites.filter((m) => m.id !== id);
        setFavorites(updateFavorites);
        localStorage.setItem("favorites", JSON.stringify(updateFavorites));
    };

    return(
        <Context.Provider value={{
            movies,
            fetchMovies,
            clearMovies,
            loading,
            error,
            favorites,
            addFavorites,
            removeFavorites,
            lastSearch,
            setLastSearch,
        }}>
            {children}
        </Context.Provider>
    );
}

export const useMovieContext = () => useContext(Context);
