import React from 'react'

function ProfileAdresse() {
    return (
        <div className=" flex flex-col justify-center md:justify-start w-full md:w-xl lg:w-[50vw] p-5">
            <div className="w-full h-[60vh] md:h-[65vh] lg:h-[78vh] xl:h-[78vh] flex flex-col p-10 bg-white">
                <h4 className="text-2xl md:text-3xl lg:4xl font-bold opacity-80 mb-5">Mes informations</h4>
                <p className="text-sm font-normal">
                    N'hésitez pas à modifier vos coordonnées ci-dessous pour que votre compte MINGA soit parfaitement à jour. (* Indique un champ obligatoire).
                </p>
            </div>
        </div>
    )
}

export default ProfileAdresse