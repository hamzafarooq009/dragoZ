import React from 'react';

const CharacterSidebar = ({ isOpen, closeSidebar, character, getPlanetInfo }) => {
  const planetInfo = character.originPlanet ? getPlanetInfo(character.originPlanet.id) : null;

  return (
    <div
      className={`fixed top-0 right-0 w-1/3 h-full bg-black bg-opacity-90 shadow-lg transform transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } overflow-y-auto`}
      style={{ zIndex: 1000 }}
    >
      <button className="absolute top-4 right-4 text-white" onClick={closeSidebar}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="p-6">
        <img src={character.image} alt={character.name} className="w-full h-40 object-contain mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-white">{character.name}</h2>
        <div className="flex space-x-2 mb-3">
          <span className="px-2 py-1 bg-green-500 text-white rounded-full text-sm">N°{character.id}</span>
          <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-sm">{character.race}</span>
          <span className="px-2 py-1 bg-red-500 text-white rounded-full text-sm">Max Ki: {character.maxKi}</span>
        </div>
        <div className="text-white">
          <p><strong>Ki:</strong> {character.ki}</p>
          <p><strong>Description:</strong> {character.description}</p>
        </div>
        {planetInfo && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2 text-white">Planet Information</h3>
            <div className="text-white">
              <>
                <img src={planetInfo.image} alt={planetInfo.name} className="w-full h-32 object-cover mb-4" />
                <p><strong>Planet Name:</strong> {planetInfo.name}</p>
                <p><strong>Description:</strong> {planetInfo.description}</p>
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterSidebar;