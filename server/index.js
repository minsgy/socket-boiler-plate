
import database from './db/database.js'
import { typeDefs } from './schema/graphql/Query.js'
import { ApolloServer } from 'apollo-server'


// action method (반환, 입력, 수정, 삭제 등)
const resolvers = {
    Query: {
        teams: () => database.teams,
        team: (parent, args) => database
            .teams
            .filter((team) => team.id === args.id)[0],
        suppliesTeam: (parent, args) => database
            .teams
            .map((team) => {
                team.supplies = database
                    .supplies
                    .filter((supply) => supply.team === team.id)
                return team
            }),
        equipments: () => database.equipments,
        supplies: () => database.supplies
    },
    Mutation: {
        deleteEquipment: (parent, args) => { 
            const deletedEquipment = database
                .equipments
                .filter((equipment) => equipment.id === args.id)[0]
            database.equipments = database
                .equipments
                .filter((equipment) => equipment.id !== args.id)
            return deletedEquipment
        },
        insertEquipment: (parent, args) => { 
            database.equipments.push(args)
            return args
        }
    }
}
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`)
})