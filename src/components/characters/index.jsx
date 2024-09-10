import { useEffect, useState } from 'react';
import './style.css';

const Characters = () => {
    const apiCharacters = 'https://hp-api.onrender.com/api/characters';
    const [characters, setCharacters] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!apiCharacters) {
            console.warn("API URL is not provided");
            return;
        }

        setLoading(true);
        fetch(apiCharacters)
            .then((resp) => {
                if(!resp) {
                    throw new Error('Network response was not ok');
                }
                return resp.json();
            })
            .then((data) => {
                setCharacters(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            })
    }, [apiCharacters])
    return (
        <div className='wrapper'>
            {loading ? (
                <p>Loading... Wait a little bit</p>
            ) : (
                characters ? (
                    <div>
                        <h1>Characters:</h1>
                        {characters.map((character, index) => (
                            <div key={index}>
                                <p>{character.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No characters available</p>
                )
            )}
        </div>
    )
};

export default Characters;