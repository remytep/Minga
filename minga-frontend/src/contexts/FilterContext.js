import React, { useState, createContext } from 'react'

export const FilterContext = createContext();

function FilterProvider({children}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <FilterContext.Provider value={{ isOpen, setIsOpen, handleClose }}>{children}</FilterContext.Provider>
  )
}

export default FilterProvider