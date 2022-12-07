import React, { useState, createContext } from 'react'

export const MyFiltersContext = createContext();

function MyFilterProvider({children}) {
  const [isOpenMyFilters, setIsOpenMyFilters] = useState(false);
  
  const handleClose = () => {
    setIsOpenMyFilters(false);
  }

  return (
    <MyFiltersContext.Provider value={{ isOpenMyFilters, setIsOpenMyFilters, handleClose }}>{children}</MyFiltersContext.Provider>
  )
}

export default MyFilterProvider