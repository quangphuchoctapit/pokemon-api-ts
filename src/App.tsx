import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PokemonCollection from './components/PokemonCollection'
import { IPokemon, IPokemons, IViewDetail } from './interface'



const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [viewDetail, setViewDetail] = useState<IViewDetail>({
    id: 0,
    isOpened: false
  })
  useEffect(() => {
    const getPokemons = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);
        const dataPokemons = response.data.results;
        setLoading(false)
        setNextUrl(response.data.next)


        // Fetch details for all pokemons in parallel
        const pokemonDetailsPromises = dataPokemons.map(async (pokemon: IPokemons) => {
          const pokemonDetail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          return pokemonDetail.data;
        });

        // Wait for all details to be fetched
        const allPokemonDetails = await Promise.all(pokemonDetailsPromises);

        // Update the state with all fetched details
        setPokemons(allPokemonDetails);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    getPokemons();
  }, []);

  const nextPage = async () => {
    setLoading(true)
    let res = await axios.get(nextUrl)
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: IPokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      setPokemons((p) => [...p, poke.data])
      setLoading(false)
    })
  }

  // console.log(pokemons)

  return (
    <div className='App'>
      <div className="bg-cyan-950">
        <header className="pokemon-header w-full h-full">
          <div className="max-w-screen-xl mx-auto">
            <h1 className='text-5xl text-green-700 font-bold text-center p-3 uppercase'>
              Pokemon
            </h1>
          </div>
        </header>
        <PokemonCollection pokemons={pokemons} viewDetail={viewDetail} setViewDetail={setViewDetail} />
        <div className="flex items-center justify-center py-5">
          <button className='text-xl text-white bg-gradient-to-tr from-orange-300 to-yellow-300  p-3 rounded-lg' onClick={() => { nextPage() }}>{loading ? 'Loading...' : 'Load more pokemons'}</button>
        </div>
      </div>
    </div>
  )
}

export default App
