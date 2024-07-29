import { useState } from 'react';
import axios from 'axios';
import { useCharacters } from '../context/CharactersContext';

export default function CreateCharacterModal({ closeModal }) {
  const { addCharacter } = useCharacters();
  const [formData, setFormData] = useState({
    name: '',
    kiLevel: '',
    maxKi: '',
    race: '',
    gender: '',
    planetOfOrigin: '',
    bodyType: '',
    clothingDescription: '',
    hairDescription: '',
    expressionDescription: '',
    description: '',
    backgroundDescription: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        model: 'dall-e-3',
        prompt: `Create a detailed, full-length image of a custom character with the following details:
        Name: ${formData.name}
        Gender: ${formData.gender}
        Race: ${formData.race}
        Body Type: ${formData.bodyType}
        Ki Level: ${formData.kiLevel}
        Max Ki: ${formData.maxKi}
        Planet of Origin: ${formData.planetOfOrigin}
        Clothing: ${formData.clothingDescription}
        Hair: ${formData.hairDescription}
        Expression: ${formData.expressionDescription}
        Description: ${formData.description}
        Background: ${formData.backgroundDescription}
        The image should be in a 9:16 aspect ratio, with the character standing upright and centered. The image should only contain the character without any additional text, labels, graphs, or annotations.`,
        size: '1024x1792',
        n: 1,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      });
      setGeneratedImage(response.data.data[0].url);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addImageToList = () => {
    const newCharacter = {
      id: Date.now(),
      name: formData.name,
      kiLevel: formData.kiLevel,
      maxKi: formData.maxKi,
      race: formData.race,
      gender: formData.gender,
      planetOfOrigin: formData.planetOfOrigin,
      image: generatedImage,
    };
    addCharacter(newCharacter);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button className="absolute top-4 right-4 text-gray-700" onClick={closeModal}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-4">Create Your Own Character</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="kiLevel"
            placeholder="Ki Level"
            value={formData.kiLevel}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="maxKi"
            placeholder="Max Ki"
            value={formData.maxKi}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="race"
            placeholder="Race"
            value={formData.race}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="planetOfOrigin"
            placeholder="Planet of Origin"
            value={formData.planetOfOrigin}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="text"
            name="bodyType"
            placeholder="bodyType"
            value={formData.bodyType}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="clothingDescription"
            placeholder="clothingDescription"
            value={formData.clothingDescription}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="hairDescription"
            placeholder="hairDescription"
            value={formData.hairDescription}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="expressionDescription"
            placeholder="expressionDescription"
            value={formData.expressionDescription}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="description"
            placeholder="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="backgroundDescription"
            placeholder="backgroundDescription"
            value={formData.backgroundDescription}
            onChange={handleInputChange}
            className="mb-4 px-4 py-2 w-full rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Generate Image
          </button>
        </form>
        {isLoading && (
          <div className="mt-4 flex justify-center">
            <div className="loader" />
          </div>
        )}
        {generatedImage && (
          <div className="mt-4">
            <img src={generatedImage} alt="Generated Character" className="w-full h-96 object-cover rounded-lg shadow-md" />
            <button
              onClick={addImageToList}
              className="w-full mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
            >
              Add Image to List
            </button>
          </div>
        )}
      </div>
    </div>
  );
}