export interface IPokemons {
    name: string,
    url: string
}

export interface IPokemon {
    id: number,
    name: string,
    sprites: {
        front_default: string
    },
}

export interface IPokemonDetail extends IPokemon {
    abilities?: {
        ability: string
        name: string
    }[] | undefined
}

export interface IViewDetail {
    id: number,
    isOpened: boolean
}