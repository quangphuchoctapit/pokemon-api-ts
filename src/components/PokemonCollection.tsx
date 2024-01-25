import React from 'react'
import { IPokemon, IPokemons, IPokemonDetail, IViewDetail } from '../interface'
import PokemonList from './PokemonList'

interface IProps {
    pokemons: IPokemonDetail[],
    viewDetail: IViewDetail
    setViewDetail: React.Dispatch<React.SetStateAction<IViewDetail>>
}

const PokemonCollection: React.FC<IProps> = (props) => {
    const { pokemons, viewDetail, setViewDetail } = props
    const selectPokemon = (id: number) => {
        setViewDetail({
            id: id,
            isOpened: true
        })
    }

    console.log(pokemons[0])

    return (
        <div className='text-white'>
            <section className='mx-5 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {pokemons.map((pokemon) => (
                    <div onClick={() => selectPokemon(pokemon.id)} key={pokemon.id} className="rounded-xl bg-black max-sm:w-[300px] w-full mx-auto p-3">
                        <PokemonList viewDetail={viewDetail} setViewDetail={setViewDetail} key={pokemon.id} id={pokemon.id} abilities={pokemon.abilities} name={pokemon.name} image={pokemon.sprites.front_default} />
                    </div>
                ))}
            </section>
        </div>
    )
}

export default PokemonCollection
