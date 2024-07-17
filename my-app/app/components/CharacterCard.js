import React from 'react';

const CharacterCard = ({ character, planetInfo, handleCharacterClick }) => {
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
};

export default CharacterCard;