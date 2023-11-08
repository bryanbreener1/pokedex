import React, { useEffect, useRef, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useSelector } from 'react-redux'
import PokeContainer from '../components/Pokedex/PokeContainer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './styles/Pokedex.css'
import TopDesign from '../components/TopDesign'

const Pokedex = () => {
  const [selectValue, setSelectValue] = useState('all-pokemons')

  const trainerName = useSelector(states => states.trainerName)
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
  const urlTypes = 'https://pokeapi.co/api/v2/type'

  const [ pokemons, getAllPokemons, hasError, setPokemons] = useFetch(url)
  const [ types, getAllTypes] = useFetch(urlTypes)


  useEffect(() => {
    if(selectValue === 'all-pokemons'){
      getAllPokemons()
    }else{
      axios.get(selectValue)
        .then(res => {
          const data = {
            results: res.data.pokemon.map(pokeInfo => pokeInfo.pokemon)
          }
          setPokemons(data)
          
        })
        .catch(err => console.log(err))
    }
  }, [selectValue])
  
  useEffect(() => {
    getAllTypes()
  }, [])
  
  const navigate = useNavigate()

  const searchPokemon = useRef()
  
  const handleSubmit = e =>{
    e.preventDefault()
    const inputValue = searchPokemon.current.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
  }

  const handleChangeType = e =>{
    setSelectValue(e.target.value)
  }

  return (
    <div className='pokedex'>
      <TopDesign/>
      <div className='pokedex__container'>
        <p className='pokedex__greeting'> <span className='pokedex__username'>Welcome {trainerName}!</span>, you can find your favorites pokemons here </p>
        <form className='pokedex__form' onSubmit={handleSubmit}>
          <input className='pokedex__input' ref={searchPokemon} type="text" placeholder=' search a pokemon'/>
          <button className='pokedex__button'>Search</button>
        </form>
        <select className='pokedex__select' onChange={handleChangeType}>
          <option value="all-pokemons">All pokemons</option>
          {
            types?.results.map( type => (
              <option className='pokedex__options' key={type.url} value={type.url}>{type.name}</option>
            ))
          }
        </select>
        <PokeContainer pokemons={pokemons?.results}/>
      </div>

      </div>
  )
}

export default Pokedex