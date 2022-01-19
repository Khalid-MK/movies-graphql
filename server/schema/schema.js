const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const movies = [
    { name: "Joker", genre: "Drama", id: "1" },
    { name: "Batman", genre: "Action", id: "2" },
    { name: "La La Land", genre: "Musical", id: "3" },
    { name: "Interstellar", genre: "Sci-Fi", id: "4" },
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => {
        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            genre: { type: GraphQLString },
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => {
        return {
            movie: {
                type: MovieType,
                args: {
                    id: { type: GraphQLID }
                },
                resolve(parent, args) {
                    // get data from mongo
                    // mock using lodash
                    return _.find(movies, { id: args.id });
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})