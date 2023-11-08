import React, { useRef } from 'react'
import { setTrainerNameG } from '../store/slices/trainerName.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './styles/Home.css'

const Home = () => {
    const trainerNameRef = useRef()
    const navigate = useNavigate()
    const trainerName = useSelector(states=>states.trainerName)

    const dispatch = useDispatch()
    
    const handleSubmit = e =>{
        e.preventDefault()
        dispatch(setTrainerNameG(trainerNameRef.current.value.trim()))
        navigate('/pokedex')
    }


  return (
    <div className='home__container'>
      <div className='home'>
          <img className="home__img" src="/pokedex.PNG" alt="" />
          <h2 className='home__title'>Hi trainer¡</h2>
          <p className='home__message'>To get in this aplication, please enter your trainer name</p>
          <form className='home__form' onSubmit={handleSubmit}>
              <input className='home__input' ref={trainerNameRef} type="text" placeholder=' write your name'/>
              <button className='home__button'>Catch them all!</button>
          </form> 
      </div>
    </div>
  )
}

export default Home