import { useState } from "react";
import { Game } from "../logic/Game.js";

export function DisplayGame({game}) {

    const [gameState, setGameState] = useState(game.getState());

    console.log(gameState);

    return (
        <div className="gameContainer">
            <GameScoreboard gameState={gameState} />
            <GameBoard gameState={gameState} setGameState={setGameState} />
        </div>
    )
}

export function GameScoreboard({gameState}) {

    return (
        <div className="gameScoreboard">
            <div className="personalRecord">Personal Record: {gameState.personalRecord}</div>
            <div className="currentScore">Current Score: {gameState.count}</div>
        </div>
    )
}

function handleClick(game, setGameState, id) {

    console.log(id);
    game.selectPokemon(id);
    setGameState(game.getState());
}

export function GameBoard({gameState, setGameState}) {

    if (!gameState) return <div>Loading...</div>;

    const game = Game(gameState);
    const pokemonList = game.getRandomPokemonList(10);
    // const pokemonList = game.getPokemonList().slice(0, 10); //Delete after testing and uncomment above
    
    const pokemonImgs = pokemonList.map((obj) => {
        return (
        <div className="pokemonImageContainer" pokeid={obj.id} key={obj.id} onClick={() => handleClick(game, setGameState, obj.id)}>
            <img id={obj.id} className="pokemonImage" src={obj.imgUrl} alt="" /> 
        </div>
        )
    })

    return (
        <div className="gameBoard">
            {pokemonImgs}
        </div>
    )
}