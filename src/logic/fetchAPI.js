async function getGeneration(id) {
    try {
        const generationPromise = await fetch(`https://pokeapi.co/api/v2/generation/${id}`);
        const generation = await generationPromise.json();
        return generation;
    } catch(err) {
        alert(err);
    }
}

async function getSpeciesFromGeneration(generation) {
    try {
        const speciesResponseList = await Promise.all(generation.pokemon_species.map((species) => fetch(species.url)));
        const speciesList = await Promise.all(speciesResponseList.map((species) => species.json()));
        return speciesList;
    } catch(err) {
        alert(err);
    }
}

async function getPokemonFromSpecies(species) {
    try {
        let pokemonPromises = [];
        for (let specie of species) {
            const varieties = specie.varieties;
            //variety returns an array of typically one or few items
            for (let variety of varieties) {
                //is_default is true when it is the base version, not for example, the aloha version
                if (variety.is_default) {
                    pokemonPromises.push(fetch(variety.pokemon.url));
                }
            }
        }

        const pokemonResponses = await Promise.all(pokemonPromises);
        const pokemonList = await Promise.all(pokemonResponses.map((resp) => resp.json()));
        return pokemonList;
    } catch(err) {
        alert(err);
    }
}

async function getPokemonList(pokemonPromiseList) {
    let pokemonList = await pokemonPromiseList;
    return pokemonList.map((obj) => {
        return {
            id : obj.id, 
            name: obj.name, 
            imgUrl: obj.sprites.front_default
        }
    })
    // let imgLinks = [];
    //   const conditions = ['front_default'];
    //   pokemonList.forEach((pokemon) => {
    //     for (const [key, value] of Object.entries(pokemon.sprites)) {
    //       if (conditions.some((con) => key.includes(con))) imgLinks.push({value});
    //     }
    //   })
    // return imgLinks;
}

export async function getPokemonListFromGen(genID = 1) {
    const gen = await getGeneration(genID);
    const species = await getSpeciesFromGeneration(gen);
    const pokemon = await getPokemonFromSpecies(species);
    const pokemonList = await getPokemonList(pokemon);

    return pokemonList;
}
