import React, {useState}  from "react";
import ReactDOM from 'react-dom';
import { useAuth, ProvideAuth } from './Auth'
import { LoginPage } from './Login'
import  { Signin }  from './Signin'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";


let isAuthenticated = ()=>{
  let token = localStorage.getItem('token');
  if (!token) return false
  let payload = JSON.parse(window.atob(token.split('.')[1])); 
  return Date.now() < payload.exp*1000 ? true : false
}

let App = () =>{
  return (
    <ProvideAuth>
      <Router>
	  <div>
	    <Route
	      path="/"
	        render={(props) => <Navigation key={props.location.key} />}
	    />

	    <Switch>
	      <Route path="/public">
		<PublicPage />
	      </Route>
	      <Route path="/login">
		<LoginPage />
	      </Route>
	      <Route path="/signin">
		<Signin /> 
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

function Navigation() {
  let history = useHistory();
  let auth = useAuth();

  return (
    <>
      {auth.isAuthenticated() && 
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
      }
      {!auth.isAuthenticated() && 
	<p>You are not logged in.</p>
      }
      <ul>
	<li>
	  <Link to="/public">Public Page</Link>
	</li>
	<li>
	  <Link to="/protected">Protected Page</Link>
	</li>
      </ul>
    </> 
  )
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




function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

ReactDOM.render(
  <App/>, document.getElementById('App')
);
