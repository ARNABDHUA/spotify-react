import React, { useContext, useRef } from 'react'
import { useState } from 'react'
import { assets ,songsData } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../../context/PlayerContext'

const Sidebar = () => {
  const[searchTerm,setsearchTerm]= useState("")
    const navigate = useNavigate();
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
        <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
            <div className='bg-[#121212] h-[30%] rounded flex flex-col justify-around '>
            <div className=' flex items-center p-2 gap-3 '>
          <img src={assets.spotify_logo} className='w-8 ' alt="logo" />
          <p className='font-bold text-white'>Spotify</p>
        </div>
                <div onClick={() => navigate('/')} className='flex items-center gap-3  pl-8 cursor-pointer min-h-8'>
                    <img className='w-6' src={assets.home_icon} alt="" />
                    <p className='font-bold'>Home</p>
                </div>
                {/* <div className='flex items-center gap-3 text-white pl-8'>
                    <img className=' w-6' src={assets.search_icon} alt="" />
                    <p className='font-bold'>Search</p>
                </div> */}
                 <div className='flex items-center gap-2 pl-8 cursor-pointer min-h-8'>
          <img className='w-6' src={assets.search_icon} alt="" />
          <p className='font-bold'></p>
          <input className='Search outline-none rounded-lg  max-w-40 font-bold bg-black' type="text" placeholder='Search here.' onChange={(e)=>{setsearchTerm(e.target.value);
          }} />
        </div>
        <div className='temple overflow-auto ... no-scrollbar '>
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
            <div className='showName'key={val.id}>
              <h5 onClick={reset} className='flex  font-thin cursor-pointer  hover:bg-[#ffffff2b]' >{val.name}</h5>
            </div>
          )
        })
        }
        </div>
            </div>
            <div className="bg-[#121212] h-[70%] rounded">
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <img className='w-8' src={assets.stack_icon} alt="" />
                        <p className=' font-semibold'>Your Library</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img className='w-5' src={assets.arrow_icon} alt="" />
                        <img className='w-5' src={assets.plus_icon} alt="" />
                    </div>
                </div>
                <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 '>
          <h1 className='text-xl'>Create your first playlist</h1>
          
          <div ref={showRef} className='max-h-12 temple overflow-auto ... no-scrollbar hidden'>{songsData.map((val)=>{ const setData=()=>{
            
            // write some code
            // write some code
            playWithId(val.id);
            setsearchTerm("");

          }
            return(<div key={val.id}>
              <div onClick={setData} className=' cursor-pointer hover:bg-[#ffffff2b]'>{val.name}</div>
            </div>
              )
          })}</div>
          <button onClick={view}  className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Create playlist</button>
        </div>
                
            </div>
        </div>
    )
}

export default Sidebar