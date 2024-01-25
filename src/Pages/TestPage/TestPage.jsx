import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import MainContent from '../../Components/MainContent/MainContent';
import Container from '../../Components/Container/Container';
import spotifyApi from '../../Services/SpotifyApi';
import './TestPage.css';

const TestPage = () => {
    const [musicId, setMusicId] = useState("5VW3BRwYhsqfZYRi90UzfR");
    const [name, setName] = useState("");
    const [albumName, setAlbumName] = useState("");
    const [image, setImage] = useState("");
    const [artist, setArtist] = useState("");
    const [authToken, setAuthToken] = useState("");
    
    useEffect(() => {
        getToken();
    }, []);
    
    useEffect(() => {
        loadTrack();
    }, [musicId]);

    const getToken = async () => {
        const clientId = process.env.REACT_APP_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    
        const headers = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: clientId,
                password: clientSecret,
            },
        };
    
        const data = {
            grant_type: 'client_credentials',
        };
    
        try {
            const promise = await axios.post(
                'https://accounts.spotify.com/api/token',
                qs.stringify(data),
                headers
            );
            console.log(promise.data);
            setAuthToken(promise.data.access_token);
        } catch (error) {
            console.log(error);
        }
    }

    async function loadTrack() {
        try {
            const headers = { 'Authorization': 'Bearer ' + authToken }
            const promise = await spotifyApi.get(
                // "/tracks/0sHSFzglnJ1b9mILzQ7ifJ",
                '/tracks/' + musicId,
                { headers: headers }
            );
            console.log(promise.data);

            setName(promise.data.name);
            setAlbumName(promise.data.album.name);
            setImage(promise.data.album.images[1].url);
            setArtist(promise.data.artists[0].name);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MainContent>
            <section className="music">
                <Container>
                    <div className="music-card">
                        <img src={image} alt="" />
                        <h1>{name}</h1>
                        <p>{albumName}</p>
                        <h3 className="artist">{artist}</h3>
                    </div>
                    <form action="" onSubmit={(() => {setMusicId()})}>
                        <label htmlFor="musicId">Id da música</label>
                        <input
                            id='musicId'
                            name='musicId'
                            type='text'
                            value={musicId}
                            onChange={(() => {setMusicId()})}
                        />
                        <button type='submit'>Enviar</button>
                    </form>
                </Container>
            </section>
        </MainContent>
    );
};

export default TestPage;