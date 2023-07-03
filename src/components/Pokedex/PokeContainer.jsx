import React from 'react'
import PokeCard from './PokeCard';
import './styles/Pokecontainer.css'

const PokeContainer = ({pokemons}) => {
  return (
    <div className='poke__container'>
        {
            pokemons?.map(pokemon => (
                <PokeCard 
                    key={pokemon.url}
                    url={pokemon.url}
                />
            ))
        }
    </div>
  )
}

export default PokeContainer