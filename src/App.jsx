import { useState, useEffect } from 'react'

import { DisplayGame } from './components/gameBoard';
import { Game } from "./logic/Game.js";

import './styles/App.css';
import './styles/header.css';
import './styles/gameBoard.css';
import './styles/scoreBoard.css';

// Custom hook to initialize the game object 
function useGame(genID = 1) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function startGame() {
      const gameObj = Game();
      await gameObj.populatePokemonList(genID);
      if (!ignore) {
        setGame(gameObj);
      }
    }

    startGame();

    return () => {
      ignore = true;
    }
  }, [genID])

  return game;
} 

function App() {

  const game = useGame(1);

  return (
    <div className="container">
      <div className="header">
        <h1 className="headerTitle pokemonFont">PoKéMoN Memory Game </h1>
        <div className="gameInformation">
          <p className="gameInstruction">Click as many unique pokemon as possible. The round is restarted once you click on the same pokemon twice</p>
          <p className="maxPokemon">There are {!game ? 0 : game.getPokemonList().length} pokemon</p>
        </div>
      </div>

      <div className="body">
        {game ? <DisplayGame game={game} /> : <div className="loadingScreen">Loading...</div>}
      </div>

    </div>
  )
}

export default App
