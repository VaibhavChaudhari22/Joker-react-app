import React, { useState, useEffect } from 'react';

const JokeCategories = [
  'Programming',
  'Pun',
  'Knock-knock',
  'Dad',
  'Misc',
  'Animal',  // New category
  'Science', // New category
  'History', // New category
  'Spooky',  // New category
];

const backgroundImages = {
  Programming: 'https://img.freepik.com/premium-photo/cityscape-with-data-floating-it-image-binary-code-filled-city-night-ai-generated_585735-18352.jpg?w=996',
  Pun: 'https://www.shutterstock.com/shutterstock/photos/2047876454/display_1500/stock-photo-two-in-bed-a-woman-looks-with-suspicion-at-a-man-who-has-turned-away-in-the-other-direction-2047876454.jpg',
  'Knock-knock': 'https://media.istockphoto.com/id/1226298339/photo/cropped-view-of-collector-knocking-on-door-with-hand.jpg?s=2048x2048&w=is&k=20&c=0zxLvDMok1giotuzdgsf_ofRHJcIa7cy-KljFkPuJqI=',
  Dad: 'https://img.freepik.com/premium-photo/father-son-laughing-laughing-together_398492-7919.jpg?w=996',
  Misc: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/65acc890-3545-4905-95ee-e7655d2b62dc/70228bbd-6d72-4704-9c53-e0496920a660.png',
  Random: 'https://c7.alamy.com/comp/S12MJ3/an-abstract-digital-painting-of-a-distorted-view-of-a-womans-face-S12MJ3.jpg', 
  Animal: 'https://www.rd.com/wp-content/uploads/2018/12/50-Funny-Animal-Pictures-That-You-Need-In-Your-Life-2.jpg?fit=700,700', // New image
  Science: 'https://img.freepik.com/premium-photo/funny-scientist-with-beard-glasses-beard_950347-15396.jpg?w=900', // New image
  History: 'https://img.freepik.com/free-vector/stone-age-hand-drawn-illustration_23-2150079536.jpg?w=740&t=st=1727018335~exp=1727018935~hmac=c359d9d33ee897993aa0e8502c87cce005a55d7df8d60edbc9cc3e87f58fc0f8', // New image
  Spooky: 'https://en.pimg.jp/105/718/349/1/105718349.jpg', // New image
};

function Joker() {
  const [joke, setJoke] = useState({ setup: '', punchline: '' });
  const [selectedCategory, setSelectedCategory] = useState('Random');
  const [favoriteJokes, setFavoriteJokes] = useState([]);

  const URL = 'https://official-joke-api.appspot.com/random_joke';

  const getNewJoke = async () => {
    try {
      const response = await fetch(`${URL}?category=${selectedCategory}`);
      const data = await response.json();
      setJoke({ setup: data.setup, punchline: data.punchline });
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  const toggleFavorite = () => {
    const newFavorites = [...favoriteJokes];
    const jokeIndex = newFavorites.findIndex(
      (j) => j.setup === joke.setup && j.punchline === joke.punchline
    );
    if (jokeIndex !== -1) {
      newFavorites.splice(jokeIndex, 1);
    } else {
      newFavorites.push(joke);
    }
    setFavoriteJokes(newFavorites);
  };

  useEffect(() => {
    getNewJoke();
  }, [selectedCategory]);

  useEffect(() => {
    const backgroundImage = backgroundImages[selectedCategory] || backgroundImages.Random;
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';

    // Cleanup function to reset background when the component unmounts
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, [selectedCategory]);

  return (
    <div className="joker-app" style={{ backgroundColor: 'transparent' }}>
      <h1 className="app-title">Joker!</h1>
      <div className="category-selector">
        <label htmlFor="category">Select Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {JokeCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="joke-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '20px', borderRadius: '10px' }}>
        <h2>{joke.setup}</h2>
        <p>{joke.punchline}</p>
      </div>
      <div className="buttons">
        <button className="new-joke-button" onClick={getNewJoke}>
          New Joke
        </button>
        <button className="favorite-button" onClick={toggleFavorite}>
          {favoriteJokes.includes(joke) ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
      <div className="favorite-jokes">
        <h3>Favorite Jokes:</h3>
        <ul>
          {favoriteJokes.map((j, index) => (
            <li key={index}>
              <p>{j.setup}</p>
              <p>{j.punchline}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Joker;
