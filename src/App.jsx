import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { LoginPage } from './Login'
import { useAuth, authContext } from './Auth'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJuaWNrIiwiaWF0IjoxNjExMzQ5MDAzLCJleHAiOjE2MTEzNTI2MDN9.7ora052Xg8j56TlR-1iriFj7gve8NFDl3mcLFlp3kOQ'
let expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYW5kbGUiOiJuaWNrIiwiaWF0IjoxNjExMDU3MDk4LCJleHAiOjE2MTEwNjA2OTh9.ZT6HZowO7Ffya5XQfT3fhVqTfP2IPnLkJjhSuRx8HEY'

// This example has 3 pages: a public page, a protected
// // page, and a login screen. In order to see the protected
// // page, you must first login. Pretty standard stuff.
// //
// // First, visit the public page. Then, visit the protected
// // page. You're not yet logged in, so you are redirected
// // to the login page. After you login, you are redirected
// // back to the protected page.
// //
// // Notice the URL change each time. If you click the back
// // button at this point, would you expect to go back to the
// // login page? No! You're already logged in. Try it out,
// // and you'll see you go back to the page you visited
// // just *before* logging in, the public page.

let App = () =>{
  return (
    <ProvideAuth>
      <Router>
	<div>
	  <AuthButton />

	  <ul>
	    <li>
	      <Link to="/public">Public Page</Link>
	    </li>
	    <li>
	      <Link to="/protected">Protected Page</Link>
	    </li>
	  </ul>

	  <Switch>
	    <Route path="/public">
	      <PublicPage />
	    </Route>
	    <Route path="/login">
	      <LoginPage />
	    </Route>
	    <PrivateRoute path="/protected">
	      <ProtectedPage />
	    </PrivateRoute>
	  </Switch>
	</div>
      </Router>
    </ProvideAuth>
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

//const Auth = {
//  isAuthenticated: false,
//  signin(cb) {
//    Auth.isAuthenticated = true;
//    setTimeout(cb, 100); // fake async
//  },
//  signout(cb) {
//    Auth.isAuthenticated = false;
//    setTimeout(cb, 100);
//  }
//};

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */

function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}


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


// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
	  auth.isAuthenticated() ? (
	    children
	  ) : (
	    <Redirect
	      to={{
		pathname: "/login",
		state: { from: location }
	      }}
	    />
	  )
      }
    />
  );
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  console.log(auth)
  return auth.isAuthenticated() ? (
    <p>
      Welcome! {auth.handle +" "}
      <button
	onClick={() => {
	  auth.signout(() => history.push("/"));
	}}
      >
	Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}



function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

ReactDOM.render(
  <App/>, document.getElementById('App')
);
