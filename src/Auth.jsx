import  React, { createContext, useContext } from 'react'

const authContext = createContext();
function useAuth() {
  return useContext(authContext);
}
export {useAuth, authContext}
