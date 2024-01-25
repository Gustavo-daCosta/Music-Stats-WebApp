import React, { useEffect, useState } from 'react';
import MainContent from '../../Components/MainContent/MainContent';
import Container from '../../Components/Container/Container';
import lastfmApi from '../../Services/LastFmApi';
import spotifyApi from '../../Services/SpotifyApi';

const HomePage = () => {
    const [userToken, setUserToken] = useState("");
    const [userPicture, setUserPicture] = useState("");
    const [username, setUsername] = useState("");
    const [playCount, setPlayCount] = useState(0);

    useEffect(() => {
        loadUserData();
    }, [username]);

    async function loadUserData() {
        try {
            const promise = (await lastfmApi.get(`/?method=user.getinfo&user=gutineos&api_key=${process.env.REACT_APP_LASTFM_APIKEY}&format=json`)).data.user;
            console.log(promise);
            setUsername(promise.name);
            setUserPicture(promise.image[2]['#text']);
            setPlayCount(parseInt(promise.playcount));
        } catch (error) {
            console.log(error);
        }
    }

    const getClientCredentials = () => {
        const client_id = process.env.REACT_APP_CLIENT_ID;
        const client_secret = process.env.REACT_APP_CLIENT_SECRET;
    
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
            },
            form: {
                grant_type: 'client_credentials'
            },
            json: true,
        };

        spotifyApi.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
                setUserToken(body.access_token);
            }
        })
    }

    return (
        <MainContent>
            <Container>
                <h1>Home Page</h1>
                <div className="card">
                    <img src={userPicture} alt="" width="50px" />
                    <p>{username}</p>
                    <p>Scrobbles: {playCount}</p>
                </div>
            </Container>
        </MainContent>
    );
}

export default HomePage;