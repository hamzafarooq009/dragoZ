// app/characters/page.js
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [selectedID, setSelectedID] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dragonball-api.com/api/characters?limit=58`);
        const charactersData = response.data.items;
        setCharacters(charactersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get('https://dragonball-api.com/api/planets');
        setPlanets(response.data.items);
      } catch (error) {
        console.error('Error fetching planets:', error);
      }
    };

    fetchPlanets();
  }, []);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://dragonball-api.com/api/characters/${selectedID}`);
        setSelectedCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character:', error);
      }
    };

    if (selectedID) {
      fetchCharacter();
    }
  }, [selectedID]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCharacterClick = (character) => {
    setSelectedID(character.id);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPlanetInfo = (planetId) => {
    return planets.find(planet => planet.id === planetId);
  };

  return (
    <div className="bg-cover bg-center min-h-screen pt-20" style={{ backgroundImage: "url('/dragonballz-background.jpg')" }}>
      <div className="container mx-auto p-4">
        <h1 className="text-5xl font-bold text-white mb-12 animate-fade-in">Dragon Ball Characters</h1>
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search your character"
              className="px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-full">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCharacters.map((character) => {
                const planetInfo = character.originPlanet ? getPlanetInfo(character.originPlanet.id) : null;
                return (
                  <li
                    key={character.id}
                    className="relative bg-black bg-opacity-70 p-6 rounded-lg shadow-lg text-center transform transition-transform hover:scale-110 hover:shadow-2xl cursor-pointer hover:animate-bounce"
                    onClick={() => handleCharacterClick(character)}
                  >
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                      <div className="relative w-40 h-40 rounded-full border-4 border-white shadow-md overflow-hidden">
                        <img src={character.image} alt={character.name} className="w-full h-full object-contain transition-transform hover:scale-110" />
                      </div>
                    </div>
                    <div className="mt-20">
                      <h2 className="text-2xl font-semibold mb-2 text-white">{character.name}</h2>
                      <div className="flex justify-center space-x-2 mb-3">
                        <span className="px-2 py-1 bg-green-500 text-white rounded-full text-sm">N°{character.id}</span>
                        <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-sm">{character.race}</span>
                        <span className="px-2 py-1 bg-red-500 text-white rounded-full text-sm">Max Ki: {character.maxKi}</span>
                      </div>
                      {planetInfo && (
                        <div className="flex justify-center space-x-2 mt-2">
                          <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-sm">{planetInfo.name}</span>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {selectedCharacter && (
            <div
              className={`fixed top-0 right-0 w-1/3 h-full bg-black bg-opacity-90 shadow-lg transform transition-transform ${
                isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
              } overflow-y-auto`}
              style={{ zIndex: 1000 }}
            >
              <button className="absolute top-4 right-4 text-white" onClick={closeSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-6">
                <img src={selectedCharacter.image} alt={selectedCharacter.name} className="w-full h-40 object-contain mb-4" />
                <h2 className="text-2xl font-semibold mb-2 text-white">{selectedCharacter.name}</h2>
                <div className="flex space-x-2 mb-3">
                  <span className="px-2 py-1 bg-green-500 text-white rounded-full text-sm">N°{selectedCharacter.id}</span>
                  <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-sm">{selectedCharacter.race}</span>
                  <span className="px-2 py-1 bg-red-500 text-white rounded-full text-sm">Max Ki: {selectedCharacter.maxKi}</span>
                </div>
                <div className="text-white">
                  <p><strong>Ki:</strong> {selectedCharacter.ki}</p>
                  <p><strong>Description:</strong> {selectedCharacter.description}</p>
                </div>
                {selectedCharacter.originPlanet && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2 text-white">Planet Information</h3>
                    <div className="text-white">
                      {getPlanetInfo(selectedCharacter.originPlanet.id) ? (
                        <>
                          <img src={getPlanetInfo(selectedCharacter.originPlanet.id).image} alt={getPlanetInfo(selectedCharacter.originPlanet.id).name} className="w-full h-32 object-cover mb-4" />
                          <p><strong>Planet Name:</strong> {getPlanetInfo(selectedCharacter.originPlanet.id).name}</p>
                          <p><strong>Description:</strong> {getPlanetInfo(selectedCharacter.originPlanet.id).description}</p>
                        </>
                      ) : (
                        <p>No planet information available.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharactersPage;