import ApolloClient from 'apollo-boost';

const URI = 'http://localhost:3000/graphql';
// const URI = 'https://quiet-peak-14863.herokuapp.com/graphql';
export default new ApolloClient({
    uri: URI,
  fetchOptions: {
    // method:'GET',
    mode: 'cors',
  }
});