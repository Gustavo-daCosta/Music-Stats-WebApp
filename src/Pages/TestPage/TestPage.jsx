import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import MainContent from '../../Components/MainContent/MainContent';
import Container from '../../Components/Container/Container';
import spotifyApi from '../../Services/SpotifyApi';
import './TestPage.css';

const TestPage = () => {
    const [name, setName] = useState("");
    const [albumName, setAlbumName] = useState("");
    const [image, setImage] = useState("");
    const [artist, setArtist] = useState("");
    const [authToken, setAuthToken] = useState("");

    useEffect(() => {
        getToken();
    }, []);

    // useEffect(() => {
    //     loadArtists();
    // }, [name]);

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

    async function loadArtists() {
        try {
            const promise = await spotifyApi.get("/tracks/6luBKkFUt5wTwz7hpLhp12");
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
                </Container>
            </section>
            <section className="token-test">
                <Container>
                    <div className="token-info">
                        <button onClick={console.log("teste")}>Gerar token</button>
                    </div>
                </Container>
            </section>
        </MainContent>
    );
};

export default TestPage;