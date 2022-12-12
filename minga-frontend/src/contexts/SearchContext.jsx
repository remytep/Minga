import React, { useState, createContext } from 'react'

export const SearchContext = createContext();

function SearchProvider({children}) {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  
  const handleCloseSearch = () => {
    setIsOpenSearch(false);
  }

  return (
    <SearchContext.Provider value={{ isOpenSearch, setIsOpenSearch, handleCloseSearch }}>{children}</SearchContext.Provider>
  )
}

export default SearchProvider