import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { HiShoppingCart, HiUserCircle, HiIdentification } from "react-icons/hi2"
import { AiFillCreditCard } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";

import ProfileWelcome from '../components/Layout/Header/profile/ProfileWelcome';
import ProfileMesCommandes from '../components/Layout/Header/profile/ProfileMesCommandes';
import ProfileAdresse from '../components/Layout/Header/profile/ProfileAdresse';


function Profile() {
  const { user, logout } = useContext(AuthContext);

  const [tab, setTab] = useState("welcome");

  const landingCommand = [
    {name: "welcome", component: <ProfileWelcome/>},
    {name: "commandes", component: <ProfileMesCommandes/>},
    {name: "adresses", component: <ProfileAdresse/>},

  ]
  return (
    <div className='bg-[#C9C5BA] w-screen lg:h-screen'>
      <header className='h-24 p-6'>
        <div className='flex justify-around'>
          <div className='text-xl font-bold'>
            <a href="/">MINGA</a>
          </div>
          <div className='text-xl font-bold'>
            <h4>MON COMPTE</h4>
          </div>
          <div className='text-xl font-bold'>
            <a
              href="/"
              onClick={() => logout()}
            >
              Logout
            </a>
          </div>
        </div>
      </header>

      <div className="flex justify-center items-center mx-auto px-8 md:px-14 lg:px-24 w-full">
          <div className="flex flex-wrap md:flex-nowrap">
            <div className="w-full lg:w-[20vw] p-5">
              <div className="border-2 border-[#e8e8e8] p-4 bg-[#f6f6f6] space-x-2">
                  <div className='flex items-center p-5 space-x-3'>
                      <div className='bg-gray-400 w-14 h-14 rounded-full flex justify-center items-center'>
                        <HiUserCircle className='text-2xl'/>
                      </div>
                      <h5 className='text-md font-medium'>{user && user.email}</h5>
                  </div>
              </div>
              <div 
                onClick={() => setTab("welcome")}  
                className="mt-2 flex justify-center text-white text-center bg-[#060606] font-bold uppercase text-sm px-6 py-3 hover:cursor-pointer"
              >
                <h4 className='mt-1'>Mon compte</h4>
              </div>
              <div
                onClick={() => setTab("commandes")}  
                className="mt-2 flex text-white text-center bg-[#060606] font-bold uppercase text-sm px-2 py-3 hover:cursor-pointer"
              >
                <HiShoppingCart className='text-2xl mr-5'/>
                <h4 className='mt-1'>Mes commande</h4>
              </div>
              <div 
                 onClick={() => setTab("adresses")}
                className="mt-2 flex text-white text-center bg-[#060606] font-bold uppercase text-sm px-2 py-3 hover:cursor-pointer"
              >
                <HiIdentification className='text-2xl mr-5'/>
                <p className='mt-1'>Mes informations</p>
              </div>
            </div>
            {
              landingCommand.map((obj, i) => {
                if (obj.name === tab){
                  return ( obj.component)
                }
              })
            }
          </div>
        </div>
    </div>
  )
}

export default Profile
