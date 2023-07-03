import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import TopDesign from '../components/TopDesign'
import './styles/Pokedexname.css'
import ProgressBar from '../components/PokedexName/ProgressBar'

const PokedexName = () => {
  const { name } = useParams()
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`
  const [ pokemon, getPokemonByName, hasError ] = useFetch(url)

  useEffect(() => {
    getPokemonByName()
  }, [name])
  console.log(pokemon);
  return (
    <div>
      <TopDesign/>
      {
        hasError
          ? <p> the pokemon {name} does not exist, please, enter a name that exist</p>
          :
          <>
            <div className={`pokemon ${pokemon?.types[0].type.name}`}>
              <section className='pokemon__card'>
                <header className={`pokemon__header ${pokemon?.types[0].type.name}`}>
                  <img className='pokemon__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                </header>
                <div className='pokemon__title'>
                  <p className='pokemon__id'>#{pokemon?.id}</p>
                  <h1 className='pokemon__name'>{name}</h1>
                  <ul className='pokemon__feautures'>
                    <li><span>weight</span>{pokemon?.weight}</li>
                    <li><span>height</span>{pokemon?.height}</li>
                  </ul>
                </div>
                <div className='pokemon__info'>
                  <div className='pokemon__types'>
                    <p className='pokemon__types-title'>Type</p>
                    <ul className='pokemon__list-types'>
                      {
                        pokemon?.types.map(typeInfo=>(
                          <li className={`pokemon__list-item ${typeInfo.type.name}`} key={typeInfo.type.url}>
                            <span>{typeInfo.type.name}</span>
                          </li>
                        ))
                      }
                    </ul> 
                  </div>
                  <div className='pokemon__abilities'>
                      <p className='pokemon__abilities-title'>Abilities</p>
                      <ul className='pokemon__abilities-list'>
                        <li className='pokemon__abilities-item'>{pokemon?.abilities[0].ability.name}</li>
                        <li className='pokemon__abilities-item'>{pokemon?.abilities[1].ability.name}</li>
                      </ul>
                  </div>
                </div>
                <div className='pokemon__stats'>
                  <p className='pokemon__stats-title'>Stats</p>
                  <ul className='pokemon__stats-list'>
                    {
                      pokemon?.stats.map(statInfo => (
                        <li className='pokemon__stats-item' key={statInfo.stat.url}>
                          <ProgressBar value={statInfo.base_stat} name={statInfo.stat.name}/>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </section>
              <section className='pokemon__moves'>
                <h3 className='pokemon__moves-title'>Movements</h3>
                <ul className='pokemon__moves-list'>
                  {
                    pokemon?.moves.map(moveInfo =>(
                      <li className='pokemon__moves-item' key={moveInfo.move.url}>{moveInfo.move.name}</li>
                    ))
                  }
                </ul>
              </section>
            </div>
          </>
      }
    </div>
  )
}

export default PokedexName