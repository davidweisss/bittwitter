import React from 'react';

import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';

import {
  useParams,
  useLocation,
  Redirect
} from "react-router-dom"

const client = new ApolloClient({
  uri: 'https://bittwitter.rocks/graphql',
  cache: new InMemoryCache()
});

let credentials = {handle:'nick', password: 'nick'}

const TOKEN = gql`
query ($handle: String!, $password: String!){
  getAuthToken(input:{
    handle: $handle, 
      password: $password
  }
  ){
    token
  }
}
`
const Token = (props)=> {

  console.log(props.password, props.handle)
  const { data, loading, error } = useQuery(props.gqlQuery, {variables: {handle: props.handle, password: props.password}});

    
  if (loading) return (
      <div>Logging in...
      </div>

  )

  if (error){
    return <p>ERROR: {error.message}</p>
  }

  const { 
    token
  } = data.getAuthToken
  localStorage.setItem('token', token);
  return(<Redirect to='/protected'/>)
}

let Signin =(props)=> 
  <ApolloProvider client={client}>
    <Token gqlQuery={TOKEN} handle={props.handle} password={props.password}/>
  </ApolloProvider>


export { Signin }
