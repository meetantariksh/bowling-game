/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
// import Person from '../../ObjectPrototypes/Person';
import GameInitiator from '../../components/GameInitiator';
import WelcomeBanner from '../../components/WelcomeBanner';
import ScoreBoard from '../../components/ScoreBoard/Loadable';

const person = [];

export default function HomePage() {
  const [isGameStarted, setGameStatus] = useState(false);
  const [isGameCompleted, setGameCompleted] = useState({
    gameCompleted: false,
    winner: '',
    loser: '',
  });
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const resetGame = () => {
    person.length = 0;
    setCurrentPlayerIndex(0);
    setGameCompleted(false);
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Bowling Game Calculator</Navbar.Brand>
      </Navbar>
      <WelcomeBanner
        gameStatus={isGameStarted}
        isGameCompleted={isGameCompleted.gameCompleted}
        winner={isGameCompleted.winner}
        loser={isGameCompleted.loser}
      />
      <div style={{ marginLeft: '10%', marginRight: '10%' }}>
        <GameInitiator
          person={person}
          gameStatus={isGameStarted}
          setGameStatus={setGameStatus}
          resetGame={resetGame}
          currentPlayerIndex={currentPlayerIndex}
          setCurrentPlayerIndex={setCurrentPlayerIndex}
          counter={counter}
          setCounter={setCounter}
          isGameCompleted={isGameCompleted.gameCompleted}
          setGameCompleted={setGameCompleted}
        />
        <br />
        {person.map((player, index) => (
          <ScoreBoard
            player={player}
            isActive={currentPlayerIndex === index}
            index={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
