
const bodyParser =require('body-parser')
const cors = require('cors');
const express = require('express');
// graphical interface for graphql
const { graphqlExpress , graphiqlExpress} = require('apollo-server-express'); //function can declare new route in our path
const { makeExecutableSchema } = require('graphql-tools'); //function call
const port = 9000;

const app = express ();

// schema definition language
// 1)  we define how our api looks like in typedefs!! 
const typeDefs = `
    type Query{
        greeting: String
    }
`;

// resolve value of greeting field
// 2) we specify how each request is handled 
const resolvers = {
    Query: {
        greeting: ()=> ' Hello World!'
    }
};


const schema = makeExecutableSchema({typeDefs, resolvers}); // call function 

app.use(cors(), bodyParser.json());
app.use('/graphql', graphqlExpress({schema})) // requests handled from graph
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(port, () => console.log(`Server is running in port ${port}`));

