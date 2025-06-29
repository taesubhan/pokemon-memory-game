import { getPokemonListFromGen } from "./fetchAPI.js";

export function Game(prevState) {
    let count;
    let personalRecord;
    let selectedPokemonIDs;
    let pokemonList;


    if (!prevState) {
        count = 0;
        personalRecord = 0;
        selectedPokemonIDs = [];
        pokemonList = [];

    } else {
        count = prevState.count;
        personalRecord = prevState.personalRecord;
        selectedPokemonIDs = [...prevState.selectedPokemonIDs];
        pokemonList = [...prevState.pokemonList];
    }


    function isRepeatSelection(id) {
        return selectedPokemonIDs.includes(id);
    }

    function addPokemonID(id) {
        selectedPokemonIDs.push(id);
        count++;
    }

    function resetGame() {
        if (count > personalRecord) personalRecord = count;
        count = 0;
        selectedPokemonIDs = [];
    }

    async function populatePokemonList(genID=1) {
        pokemonList = await getPokemonListFromGen(genID);
    }

    function getState() {
        return {count, personalRecord, selectedPokemonIDs, pokemonList}
    }

    return {
        selectPokemon: function(id) {
            if (isRepeatSelection(id)) {
                resetGame();
            } else {
                addPokemonID(id);
            }
        },

        getCount: function() {
            return count;
        },

        getPersonalRecord: function() {
            return personalRecord;
        },

        getPokemonList: function() {
            return pokemonList;
        },

        getRandomPokemonList: function(num) {
            if (num >= pokemonList.length) throw new Error("Requested more Pokemon than available")

            const shuffled = [...pokemonList].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, num);
        }, 

        populatePokemonList,
        getState
    }

}