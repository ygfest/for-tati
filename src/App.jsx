import React, { useState, useEffect } from 'react';
import reactLogo from './assets/hehe.gif';
import sitati from './assets/turning-hugging.gif';
import './App.css';
import facebook from './assets/icons8-facebook-15.png';
import ig from './assets/icons8-instagram-15.png';

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 }); // Set initial position beside the Yes button
  const [yesClicked, setYesClicked] = useState(false);
  const [mouseReachedNo, setMouseReachedNo] = useState(false);
  const [tries, setTries] = useState(0);

  useEffect(() => {
    // Get the position of the Yes button
    const yesButton = document.querySelector('.yes-btn');
    const yesButtonRect = yesButton.getBoundingClientRect();
    
    // Set the initial position of the No button beside the Yes button
    setNoButtonPosition({ x: yesButtonRect.right + 10, y: yesButtonRect.top });
  }, []);

  const handleMouseMove = (event) => {
    // Calculate the distance between the mouse pointer and the "No" button
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const noButtonX = noButtonPosition.x;
    const noButtonY = noButtonPosition.y;
    const distance = Math.sqrt((mouseX - noButtonX) ** 2 + (mouseY - noButtonY) ** 2);

    // If the distance is less than a threshold, set mouseReachedNo to true
    if (distance < 100) {
      setMouseReachedNo(true);
    } else {
      setMouseReachedNo(false);
    }

    // If the distance is less than a threshold, spawn the "No" button randomly
    if (distance < 100) {
      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * window.innerHeight;
      setNoButtonPosition({ x: randomX, y: randomY });

      // Increment the tries counter
      setTries((prevTries) => prevTries + 1);
    }
  };

  const handleYesButtonClick = () => {
    setYesClicked(true);
  };

  const handleNoButtonClick = () => {
  };

  return (
    <>
      <h1>{yesClicked ? "I love u mwah!" : tries < 4 ? "Hi Tati" : "too slow hehe"}</h1>
      <div className='card' onMouseMove={handleMouseMove}>
        <a href="https://www.instagram.com/krisvn/" target="_blank">
          <img src={yesClicked ? sitati : reactLogo} className="logo react" alt={yesClicked ? "labyutati" : "React logo"} />
        </a>
        <h2>{yesClicked ? "Okiee! Yayyy!" : "Will you be my valentine?"}</h2>
        <div className='card-body'>
          {yesClicked ? null : <button className="btn btn-primary yes-btn" onClick={handleYesButtonClick}>Yes</button>}
          <button
            className='btn btn-primary no-btn'
            style={{
              position: 'absolute',
              top: Math.min(noButtonPosition.y, window.innerHeight - 100), // Ensure the button doesn't exceed the viewport height
              left: Math.min(noButtonPosition.x, window.innerWidth - 100), // Ensure the button doesn't exceed the viewport width
              transition: 'top 0.2s, left 0.2s', // Apply transition effect to top and left properties
            }}
            onClick={handleNoButtonClick}
          >
            No
          </button>
        </div>
      </div>

      <div className='credit'>
        <h6>From estepano</h6>
        <a href="https://www.facebook.com/stefano.snestbn">
          <img src={facebook} alt="Facebook" />
        </a>
        <a href="https://www.instagram.com/__sstefano/">
          <img src={ig} alt="Instagram" />
        </a>
      </div>
    </>
  );
}

export default App;
