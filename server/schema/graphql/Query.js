import { gql } from "apollo-server"
export const typeDefs = gql`
  type Query {
    teams: [Team]
    team(id: Int): Team
    suppliesTeam(id: Int): [Team]
    equipments: [Equipment]
    supplies: [Supply]
  }

  type Mutation {
    deleteEquipment(id: String): Equipment
    insertEquipment(
    id: String
    used_by: String
    count: Int
    new_or_used: String
    ): Equipment
  }

  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
  }

  type Equipment {
    id: String
    used_by: String
    count: Int
    new_or_used: String
  }

  type Supply {
    id: String
    team: Int
  }  
`
 