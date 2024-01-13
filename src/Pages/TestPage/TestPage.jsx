import React, { useEffect, useState } from 'react';
import MainContent from '../../Components/MainContent/MainContent';
import Container from '../../Components/Container/Container';
import spotifyApi from '../../Services/SpotifyApi';
import './TestPage.css';

const TestPage = () => {
    const [name, setName] = useState("");
    const [albumName, setAlbumName] = useState("");
    const [image, setImage] = useState("");
    const [artist, setArtist] = useState("");

    useEffect(() => {
        loadArtists();
    }, [name]);

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
            <Container>
                <div className="music-card">
                    <img src={image} alt="" />
                    <h1>{name}</h1>
                    <p>{albumName}</p>
                    <h3 className="artist">{artist}</h3>
                </div>
            </Container>
        </MainContent>
    );
};

export default TestPage;