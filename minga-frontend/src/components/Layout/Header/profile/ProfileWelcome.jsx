import React from 'react'
import { HiShoppingCart } from 'react-icons/hi2'

function ProfileWelcome() {
    return (
        <div className=" flex flex-col justify-center md:justify-start w-full md:w-xl lg:w-[50vw] p-5">
            <div className="w-full h-[60vh] md:h-[65vh] lg:h-[78vh] xl:h-[78vh] flex flex-col p-10 bg-gradient-to-b from-[#ebebed] to-white">
                <h4 className="text-2xl md:text-3xl lg:4xl font-bold opacity-80 mb-5">Welcome</h4>
                <div className='text-lg font-semibold opacity-60'>
                    <p>Welcome to your profile account !</p>
                    <p>All your informations and your orders are here.</p>
                </div>
                <img className='' src="/profile/ladingProfile.jpg" alt="image" />
            </div>
        </div>
    )
}

export default ProfileWelcome