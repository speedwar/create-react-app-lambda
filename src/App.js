import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import { gql } from "apollo-boost"
import ApolloClient from "apollo-boost"
import { ApolloProvider, Query } from "react-apollo"

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql"
})

const GET_DATA = gql`
  {
    hello
    dogPhotoUrl
  }
`

const LambdaDemo = () => (
  <ApolloProvider client={client}>
    <Query query={GET_DATA}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error :(</div>

        return (
          <>
            <div>A greeting from the server: {data.hello}</div>
            <img src={data.dogPhotoUrl} alt="dog" />
          </>
        )
      }}
    </Query>
  </ApolloProvider>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
