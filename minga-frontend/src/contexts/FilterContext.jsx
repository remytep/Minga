import React, { useState, createContext } from 'react'

export const FilterContext = createContext();

function FilterProvider({children}) {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  
  const handleClose = () => {
    setIsOpenFilter(false);
  }

  return (
    <FilterContext.Provider value={{ isOpenFilter, setIsOpenFilter, handleClose }}>{children}</FilterContext.Provider>
  )
}

export default FilterProvider