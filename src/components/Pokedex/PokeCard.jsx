import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom';
import './styles/Pokecard.css'

const PokeCard = ({url}) => {
    const [pokemon, getPokemonById] = useFetch(url)
    useEffect(() => {
        getPokemonById()
    }, [])

    const navigate = useNavigate()

    const handleNavigate = () =>{
      navigate(`/pokedex/${pokemon?.name}`)
    }

    const rightUrlImage = () =>{
      const urlImage = pokemon?.sprites.other['official-artwork'].front_default
      if(urlImage){
        const splited = urlImage.split('https://')
        if(splited.length === 3){
          return "https://"+splited[2]
        }
        return "https://"+splited[1]
      }
    }

  return (
    <article className={`pokecard ${pokemon?.types[0].type.name}`} onClick={handleNavigate}>
        <header className='pokecard__header'>
          {
            pokemon && <img className='pokecard__img' src={rightUrlImage()} alt="" />
          }
        </header>
        <section className='pokecard__body'>
          <h3 className='pokecard__name'>{pokemon?.name}</h3>
          <ul className='pokecard__types'>
            {
              pokemon?.types.map(typeInfo=>(
                <li className='pokecard__types-item' key={typeInfo.type.url}>{typeInfo.type.name}</li>
              ))
            }
          </ul> 
        </section>
        <footer className='pokecard__footer'>
            <ul className='pokecard__stats'>
              {
                pokemon?.stats.map(statInfo => (
                  <li className='pokecard__stats-item' key={statInfo.stat.url}>
                    <span className='pokecard__stats-label' >{statInfo.stat.name}</span>
                    <span className='pokecard__stats-value'>{statInfo.base_stat}</span>
                  </li>
                ))
              }
            </ul>
          </footer>
    </article>
    )
}
export default PokeCard