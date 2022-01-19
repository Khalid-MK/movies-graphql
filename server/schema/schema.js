const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const movies = [
    { name: "Joker", genre: "Drama", id: "1" },
    { name: "Batman", genre: "Action", id: "2" },
    { name: "La La Land", genre: "Musical", id: "3" },
    { name: "Interstellar", genre: "Sci-Fi", id: "4" },
]

const directories = [
    { name: "Tod Philips", age: 60, id: "1" },
    { name: "Wes Anderson", age: 52, id: "2" },
    { name: "Damien Chazele", age: 58, id: "1" },
    { name: "Chirstopher Nolan", age: 51, id: "1" },
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

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => {
        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            age: { type: GraphQLInt },
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
            },
            director: {
                type: DirectorType,
                args: {
                    id: { type: GraphQLID }
                },
                resolve(parent, args) {
                    return _.find(directories, { id: args.id });
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})