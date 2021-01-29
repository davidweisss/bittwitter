import  React, { createContext, useContext, useState } from 'react'

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJuaWNrIiwiaWF0IjoxNjExOTEwNTkxLCJleHAiOjE2MTE5MTQxOTF9.qnTtZJH-9yoFrFqb1M3Suyq-njb6At9NHXsHSSWuQ0E'
let expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJuaWNrIiwiaWF0IjoxNjExMDU3MDk4LCJleHAiOjE2MTEwNjA2OTh9.ZT6HZowO7Ffya5XQfT3fhVqTfP2IPnLkJjhSuRx8HEY'



const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

const Auth = {
  isAuthenticated: ()=>{
    let token = localStorage.getItem('token');
    if (!token) return false
    let payload = JSON.parse(window.atob(token.split('.')[1])); 
    return Date.now() < payload.exp*1000 ? true : false
  },
  signin(cb) {
   localStorage.setItem('token', token); 
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    localStorage.removeItem('token')
    setTimeout(cb, 100);
  }
};

function useProvideAuth() {
  const [handle, setHandle] = useState(null);

  const signin = cb => {
    return Auth.signin(() => {
      setHandle("handle");
      cb();
    });
  };

  const signout = cb => {
    return Auth.signout(() => {
      setHandle(null);
      cb();
    });
  };

  const isAuthenticated = Auth.isAuthenticated
  return {
    isAuthenticated,
    handle,
    signin,
    signout
  };
}

export {Auth, useAuth, authContext, ProvideAuth, useProvideAuth}
