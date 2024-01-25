import axios from "axios";

const externalApi = "https://api.spotify.com/v1";

const spotifyApi = axios.create({
    baseURL: externalApi,
});

export default spotifyApi;