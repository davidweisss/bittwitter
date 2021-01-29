import React, { useState }  from 'react'
import {useHistory, useLocation } from 'react-router-dom'
import {useAuth} from './Auth'

let LoginPage= ()=> {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };

  const [data, setData] = useState({ 
        handle: '', 
        password: ''
      }); 
    const [form, setForm] = useState({ 
          handle: '', 
          password: ''
        }); 
    
    const updateField = e => { 
          setData({ 
	          ...data, 
	          [e.target.name]: e.target.value 
	        }); 
        }; 

  const submitValues = e => { 
    e.preventDefault(); 
    history.replace(`/signin?handle=${data.handle}&^password=${data.password}`)
    //auth.signin(() => {
    //  history.replace(from);
   // });
  }; 
  

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <form
	onSubmit={submitValues}
      >
	<label for="handle">Handle</label><br/>
	<input 
	  type="text" 
	  id="handle" 
	  name="handle" 
	  value={data.handle}
	  onChange={updateField}
	/><br/>
	<label for="password">Password</label><br/>
	<input 
	  type="password" 
	  id="password" 
	  name="password"
	  value={data.password}
	  onChange={updateField}
	/><br/>
      <button>
	Log in
      </button>
      </form>
    </div>
);
}
export { LoginPage }
