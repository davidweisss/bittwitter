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
query {
  getAuthToken(input:{
    handle: "${credentials.handle}", 
      password: "${credentials.password}"
  }
  ){
    token
  }
}
`
function useUrlQuery() {
    return new URLSearchParams(useLocation().search);
}
const Token = (gqlQuery)=> {


  const { data, loading, error } = useQuery(gqlQuery.gqlQuery);

  const query = useUrlQuery()
  
    
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

let Signin =()=> 
  <ApolloProvider client={client}>
    <Token gqlQuery={TOKEN}/>
  </ApolloProvider>

export { Signin }
