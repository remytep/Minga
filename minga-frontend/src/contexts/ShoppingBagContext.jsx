import React, { useState, createContext } from 'react'

export const ShoppingBagContext = createContext();

function ShoppingBagProvider({children}) {
  const [isOpenBag, setIsOpenBag] = useState(false);
  
  const handleClose = () => {
    setIsOpenBag(false);
  }

  return (
    <ShoppingBagContext.Provider value={{ isOpenBag, setIsOpenBag, handleClose }}>{children}</ShoppingBagContext.Provider>
  )
}

export default ShoppingBagProvider