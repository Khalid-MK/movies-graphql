// Load Express
const express = require('express');
const app = express();

// Import schema 
const schema = require('./schema/schema')

// Load express-graphql
const { graphqlHTTP } = require('express-graphql')
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});