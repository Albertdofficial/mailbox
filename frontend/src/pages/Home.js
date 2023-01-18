import {Link} from 'react-router-dom'
import {useEffect, useState} from 'react'
import { useWorkoutContext } from '../hooks/useMessageContext'


import './Home.css'

const Home = () => {
  const{messages, dispatch} = useWorkoutContext() // global state
  const unreadMessages = [];


    useEffect(()=>{
        const fetchMessages = async()=>{
            const response = await fetch('http://localhost:5000/message')
            const data = await response.json()

            if(response.ok){
                dispatch({type: 'GET_MESSAGES', payload:data})
            }          
        }
        fetchMessages()

    },[dispatch])

    messages && messages.map(message =>{
      if(!message.isRead){
        unreadMessages.push(message)
      }
    })
    
  return (
    <div className="home">
    <h3>Hello Albert</h3>
    <h3>You have {messages && unreadMessages.length } unread out of  {messages && messages.length} messages </h3>
       <div className="btn-container">
        <button className='btn' > <Link to='/inbox' > View Messages</Link> </button>
       </div>
    </div>
  )
}

export default Home


