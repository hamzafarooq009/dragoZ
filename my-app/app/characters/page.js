"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard';
import CharacterSidebar from '../components/CharacterSidebar';

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
                  <CharacterCard 
                    key={character.id} 
                    character={character} 
                    planetInfo={planetInfo} 
                    handleCharacterClick={handleCharacterClick} 
                  />
                );
              })}
            </ul>
          </div>
          {selectedCharacter && (
            <CharacterSidebar 
              isOpen={isSidebarOpen} 
              closeSidebar={closeSidebar} 
              character={selectedCharacter} 
              getPlanetInfo={getPlanetInfo} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CharactersPage;