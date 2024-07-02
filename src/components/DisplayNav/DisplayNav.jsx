import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import  { useContext } from 'react'
import { useState } from 'react'
import { assets,songsData } from '../../assets/assets'
import  {PlayerContext} from '../../context/PlayerContext'

const DisplayNav = () => {
    const navigate= useNavigate();
    const[searchTerm,setsearchTerm]= useState("");
    const {playWithId}=useContext(PlayerContext)
    const showRef=useRef()
    const[showBt,setShowBt]=useState("true")

    const view=()=>{
      if(showBt==="true"){
        showRef.current.style.display="initial"
        setShowBt("false")
      }
      else{
        showRef.current.style.display="none"
        setShowBt("true")
      }
    }
   
    return (
      <>
      <div className='w-full flex justify-between items-center font-semibold '>
        <div onClick={() => navigate('/')} className=' flex items-center cursor-pointer p-2 gap-3 lg:hidden'>
         
          <img src={assets.spotify_logo} className='w-8 ' alt="logo" />
          <p className='font-bold text-white'>Spotify</p>
          
        </div>
          <div className=' items-center gap-2 hidden lg:flex '>
              <img onClick={()=>navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
              <img onClick={()=>navigate( 1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
          </div>
          <div className='flex items-center gap-4'>
      
          <div className='flex items-center gap-1 pl-8 cursor-pointer lg:hidden'>
            <img onClick={view} className='w-4' src={assets.search_icon} alt="" />
            <p className='font-bold'></p>
            <input ref={showRef} className='Search  outline-none w-[50%] rounded-lg font-normal text-sm bg-black min-w-20  hidden' type="text" placeholder=' Search.' onChange={(e)=>{setsearchTerm(e.target.value);
            }} />
  </div>
        
  
            <p onClick={()=> navigate('/Premium')} className='bg-white text-black text-[15px] rounded-2xl px-4 py-1 hidden md:block cursor-pointer'>Explor Premium</p>
            <p onClick={()=> navigate('/Install')}  className='text-white bg-[#242424] text-[15px] rounded-2xl px-3 py-1  cursor-pointer hidden md:block'>Install App</p>
            <p className='bg-purple-500 text-black  h-7 rounded-full flex justify-center items-center cursor-pointer min-w-7'>A</p>
          </div>
  
       
      </div>
  
      <div className='temple max-h-20 hover:w-[100%] overflow-auto ... no-scrollbar '>
            {
            songsData
            .filter((val) =>{
              if(searchTerm==""){
                return ;
              }
              else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                return val;}
            })
          .map((val)=>{
            const reset =()=>{
              playWithId(val.id);
              setsearchTerm("");
            }
  
            return(
              <div className='showName lg:hidden'key={val.id}>
                <h5 onClick={reset} className='flex  font-thin cursor-pointer hover:bg-[#ffffff2b]' >{val.name}</h5>
              </div>
            )
          })
          }
          </div>
  
  
  
      <div className='flex items-center gap-2 mt-4'>
        <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
        <p className='bg-[#242424] text-white px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
        <p className='bg-[#242424] text-white px-4 py-1 rounded-2xl cursor-pointer'>Podcast</p>
      </div>
      </>
    )
  }
  

export default DisplayNav