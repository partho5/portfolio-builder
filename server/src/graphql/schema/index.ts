import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
    profile(username: String!): Profile
    profiles: [Profile!]!
    project(id: ID!): Project
    projects(username: String!): [Project!]!
    projectsByCategory(username: String!, category: String!): [Project!]!
  }

  type Mutation {
    createProfile(input: ProfileInput!): Profile!
    updateProfile(username: String!, input: ProfileInput!): Profile!
    deleteProfile(username: String!): Boolean!
    
    createProject(input: ProjectInput!): Project!
    updateProject(id: ID!, input: ProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
  }

  type Profile {
    id: ID!
    user_id: String!
    username: String!
    basic_info: BasicInfo!
    social_links: SocialLinks
    skill_set: [Skill!]!
    services: [Service!]!
    custom_sections: [CustomSection!]!
    created_at: String!
    updated_at: String!
  }

  type BasicInfo {
    name: String!
    displayName: String!
    title: String!
    role: String!
    bio: String
    profileImage: String
    email: String
  }

  type SocialLinks {
    github: String
    linkedin: String
    twitter: String
    youtube: String
    facebook: String
    medium: String
  }

  type Skill {
    id: String!
    name: String!
    orderIndex: Int!
  }

  type Service {
    id: String!
    icon: String!
    title: String!
    orderIndex: Int!
  }

  type CustomSection {
    id: String!
    title: String!
    type: SectionType!
    content: JSON
    order: Int!
    visible: Boolean!
  }

  enum SectionType {
    text
    list
    gallery
    achievements
    testimonials
  }

  type Project {
    id: ID!
    user_id: String!
    project_data: ProjectData!
    content: ProjectContent
    created_at: String!
    updated_at: String!
  }

  type ProjectData {
    title: String!
    description: String!
    image: String
    category: String!
    slug: String!
    featured: Boolean
  }

  type ProjectContent {
    technologies: [String!]
    links: ProjectLinks
    gallery: [String!]
  }

  type ProjectLinks {
    live: String
    github: String
  }

  input BasicInfoInput {
    name: String!
    displayName: String!
    title: String!
    role: String!
    bio: String
    profileImage: String
    email: String
  }

  input SocialLinksInput {
    github: String
    linkedin: String
    twitter: String
    youtube: String
    facebook: String
    medium: String
  }

  input SkillInput {
    id: String!
    name: String!
    orderIndex: Int!
  }

  input ServiceInput {
    id: String!
    icon: String!
    title: String!
    orderIndex: Int!
  }

  input CustomSectionInput {
    id: String!
    title: String!
    type: SectionType!
    content: JSON
    order: Int!
    visible: Boolean!
  }

  input ProfileInput {
    username: String!
    basic_info: BasicInfoInput!
    social_links: SocialLinksInput
    skill_set: [SkillInput!]!
    services: [ServiceInput!]!
    custom_sections: [CustomSectionInput!]!
  }

  input ProjectDataInput {
    title: String!
    description: String!
    image: String
    category: String!
    slug: String!
    featured: Boolean
  }

  input ProjectContentInput {
    technologies: [String!]
    links: ProjectLinksInput
    gallery: [String!]
  }

  input ProjectLinksInput {
    live: String
    github: String
  }

  input ProjectInput {
    project_data: ProjectDataInput!
    content: ProjectContentInput
  }

  scalar JSON
`; 