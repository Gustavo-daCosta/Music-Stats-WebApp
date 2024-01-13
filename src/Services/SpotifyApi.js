import axios from "axios";

const externalApi = "https://api.spotify.com/v1";

const spotifyApi = axios.create({
    baseURL: externalApi,
    headers: {
        Authorization: 'Bearer ' + process.env.REACT_APP_SPOTIFY_APIKEY
    }
});

export default spotifyApi;