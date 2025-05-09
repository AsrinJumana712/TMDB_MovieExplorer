import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "bea29752b4da89a6ec90a74333ba1b97",
  },
});

export default tmdb;
