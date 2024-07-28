import React, { useState } from 'react';
import Deatils from './assets/components/Deatils';
import Game from './assets/components/Game';

function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleEnter = () => {
    setIsEntered(true);
  };

  return (
    <div className="min-h-screen bg-gray-800 w-full bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')"}}>
      {isEntered ? (
        <Game currentUser={currentUser} />
      ) : (
        <Deatils setCurrentUser={setCurrentUser} onEnter={handleEnter} />
      )}
    </div>
  );
}

export default App;
