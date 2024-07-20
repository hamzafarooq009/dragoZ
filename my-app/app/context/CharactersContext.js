// /app/context/CharactersContext.js
"use client";

import { createContext, useState, useContext } from 'react';

const CharactersContext = createContext();

export const useCharacters = () => useContext(CharactersContext);

export const CharactersProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);

    const addCharacter = (newCharacter) => {
        setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
    };

    return (
        <CharactersContext.Provider value={{ characters, addCharacter, setCharacters }}>
            {children}
        </CharactersContext.Provider>
    );
};