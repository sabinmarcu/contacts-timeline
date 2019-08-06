// @flow
export const typeDefs = /* GraphQL */ `type AggregateContact {
  count: Int!
}

type AggregateHistory {
  count: Int!
}

type AggregateMessage {
  count: Int!
}

type AggregateSnapshot {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Contact {
  id: ID!
  username: String!
  phone: String!
  name: String!
  avatar: String!
  cover: String!
}

type ContactConnection {
  pageInfo: PageInfo!
  edges: [ContactEdge]!
  aggregate: AggregateContact!
}

input ContactCreateInput {
  id: ID
  username: String!
  phone: String!
  name: String!
  avatar: String!
  cover: String!
}

input ContactCreateOneInput {
  create: ContactCreateInput
  connect: ContactWhereUniqueInput
}

type ContactEdge {
  node: Contact!
  cursor: String!
}

enum ContactOrderByInput {
  id_ASC
  id_DESC
  username_ASC
  username_DESC
  phone_ASC
  phone_DESC
  name_ASC
  name_DESC
  avatar_ASC
  avatar_DESC
  cover_ASC
  cover_DESC
}

type ContactPreviousValues {
  id: ID!
  username: String!
  phone: String!
  name: String!
  avatar: String!
  cover: String!
}

type ContactSubscriptionPayload {
  mutation: MutationType!
  node: Contact
  updatedFields: [String!]
  previousValues: ContactPreviousValues
}

input ContactSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ContactWhereInput
  AND: [ContactSubscriptionWhereInput!]
  OR: [ContactSubscriptionWhereInput!]
  NOT: [ContactSubscriptionWhereInput!]
}

input ContactUpdateDataInput {
  username: String
  phone: String
  name: String
  avatar: String
  cover: String
}

input ContactUpdateInput {
  username: String
  phone: String
  name: String
  avatar: String
  cover: String
}

input ContactUpdateManyMutationInput {
  username: String
  phone: String
  name: String
  avatar: String
  cover: String
}

input ContactUpdateOneRequiredInput {
  create: ContactCreateInput
  update: ContactUpdateDataInput
  upsert: ContactUpsertNestedInput
  connect: ContactWhereUniqueInput
}

input ContactUpsertNestedInput {
  update: ContactUpdateDataInput!
  create: ContactCreateInput!
}

input ContactWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  avatar: String
  avatar_not: String
  avatar_in: [String!]
  avatar_not_in: [String!]
  avatar_lt: String
  avatar_lte: String
  avatar_gt: String
  avatar_gte: String
  avatar_contains: String
  avatar_not_contains: String
  avatar_starts_with: String
  avatar_not_starts_with: String
  avatar_ends_with: String
  avatar_not_ends_with: String
  cover: String
  cover_not: String
  cover_in: [String!]
  cover_not_in: [String!]
  cover_lt: String
  cover_lte: String
  cover_gt: String
  cover_gte: String
  cover_contains: String
  cover_not_contains: String
  cover_starts_with: String
  cover_not_starts_with: String
  cover_ends_with: String
  cover_not_ends_with: String
  AND: [ContactWhereInput!]
  OR: [ContactWhereInput!]
  NOT: [ContactWhereInput!]
}

input ContactWhereUniqueInput {
  id: ID
  username: String
  phone: String
}

scalar DateTime

type History {
  id: ID!
  start: Message!
  end: Message!
}

type HistoryConnection {
  pageInfo: PageInfo!
  edges: [HistoryEdge]!
  aggregate: AggregateHistory!
}

input HistoryCreateInput {
  id: ID
  start: MessageCreateOneInput!
  end: MessageCreateOneInput!
}

input HistoryCreateManyInput {
  create: [HistoryCreateInput!]
  connect: [HistoryWhereUniqueInput!]
}

type HistoryEdge {
  node: History!
  cursor: String!
}

enum HistoryOrderByInput {
  id_ASC
  id_DESC
}

type HistoryPreviousValues {
  id: ID!
}

input HistoryScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  AND: [HistoryScalarWhereInput!]
  OR: [HistoryScalarWhereInput!]
  NOT: [HistoryScalarWhereInput!]
}

type HistorySubscriptionPayload {
  mutation: MutationType!
  node: History
  updatedFields: [String!]
  previousValues: HistoryPreviousValues
}

input HistorySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: HistoryWhereInput
  AND: [HistorySubscriptionWhereInput!]
  OR: [HistorySubscriptionWhereInput!]
  NOT: [HistorySubscriptionWhereInput!]
}

input HistoryUpdateDataInput {
  start: MessageUpdateOneRequiredInput
  end: MessageUpdateOneRequiredInput
}

input HistoryUpdateInput {
  start: MessageUpdateOneRequiredInput
  end: MessageUpdateOneRequiredInput
}

input HistoryUpdateManyInput {
  create: [HistoryCreateInput!]
  update: [HistoryUpdateWithWhereUniqueNestedInput!]
  upsert: [HistoryUpsertWithWhereUniqueNestedInput!]
  delete: [HistoryWhereUniqueInput!]
  connect: [HistoryWhereUniqueInput!]
  set: [HistoryWhereUniqueInput!]
  disconnect: [HistoryWhereUniqueInput!]
  deleteMany: [HistoryScalarWhereInput!]
}

input HistoryUpdateWithWhereUniqueNestedInput {
  where: HistoryWhereUniqueInput!
  data: HistoryUpdateDataInput!
}

input HistoryUpsertWithWhereUniqueNestedInput {
  where: HistoryWhereUniqueInput!
  update: HistoryUpdateDataInput!
  create: HistoryCreateInput!
}

input HistoryWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  start: MessageWhereInput
  end: MessageWhereInput
  AND: [HistoryWhereInput!]
  OR: [HistoryWhereInput!]
  NOT: [HistoryWhereInput!]
}

input HistoryWhereUniqueInput {
  id: ID
}

scalar Long

type Message {
  id: ID!
  date: DateTime!
  text: String!
  from: Contact!
  to: Contact!
}

type MessageConnection {
  pageInfo: PageInfo!
  edges: [MessageEdge]!
  aggregate: AggregateMessage!
}

input MessageCreateInput {
  id: ID
  date: DateTime!
  text: String!
  from: ContactCreateOneInput!
  to: ContactCreateOneInput!
}

input MessageCreateOneInput {
  create: MessageCreateInput
  connect: MessageWhereUniqueInput
}

type MessageEdge {
  node: Message!
  cursor: String!
}

enum MessageOrderByInput {
  id_ASC
  id_DESC
  date_ASC
  date_DESC
  text_ASC
  text_DESC
}

type MessagePreviousValues {
  id: ID!
  date: DateTime!
  text: String!
}

type MessageSubscriptionPayload {
  mutation: MutationType!
  node: Message
  updatedFields: [String!]
  previousValues: MessagePreviousValues
}

input MessageSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MessageWhereInput
  AND: [MessageSubscriptionWhereInput!]
  OR: [MessageSubscriptionWhereInput!]
  NOT: [MessageSubscriptionWhereInput!]
}

input MessageUpdateDataInput {
  date: DateTime
  text: String
  from: ContactUpdateOneRequiredInput
  to: ContactUpdateOneRequiredInput
}

input MessageUpdateInput {
  date: DateTime
  text: String
  from: ContactUpdateOneRequiredInput
  to: ContactUpdateOneRequiredInput
}

input MessageUpdateManyMutationInput {
  date: DateTime
  text: String
}

input MessageUpdateOneRequiredInput {
  create: MessageCreateInput
  update: MessageUpdateDataInput
  upsert: MessageUpsertNestedInput
  connect: MessageWhereUniqueInput
}

input MessageUpsertNestedInput {
  update: MessageUpdateDataInput!
  create: MessageCreateInput!
}

input MessageWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  from: ContactWhereInput
  to: ContactWhereInput
  AND: [MessageWhereInput!]
  OR: [MessageWhereInput!]
  NOT: [MessageWhereInput!]
}

input MessageWhereUniqueInput {
  id: ID
}

type Mutation {
  createContact(data: ContactCreateInput!): Contact!
  updateContact(data: ContactUpdateInput!, where: ContactWhereUniqueInput!): Contact
  updateManyContacts(data: ContactUpdateManyMutationInput!, where: ContactWhereInput): BatchPayload!
  upsertContact(where: ContactWhereUniqueInput!, create: ContactCreateInput!, update: ContactUpdateInput!): Contact!
  deleteContact(where: ContactWhereUniqueInput!): Contact
  deleteManyContacts(where: ContactWhereInput): BatchPayload!
  createHistory(data: HistoryCreateInput!): History!
  updateHistory(data: HistoryUpdateInput!, where: HistoryWhereUniqueInput!): History
  upsertHistory(where: HistoryWhereUniqueInput!, create: HistoryCreateInput!, update: HistoryUpdateInput!): History!
  deleteHistory(where: HistoryWhereUniqueInput!): History
  deleteManyHistories(where: HistoryWhereInput): BatchPayload!
  createMessage(data: MessageCreateInput!): Message!
  updateMessage(data: MessageUpdateInput!, where: MessageWhereUniqueInput!): Message
  updateManyMessages(data: MessageUpdateManyMutationInput!, where: MessageWhereInput): BatchPayload!
  upsertMessage(where: MessageWhereUniqueInput!, create: MessageCreateInput!, update: MessageUpdateInput!): Message!
  deleteMessage(where: MessageWhereUniqueInput!): Message
  deleteManyMessages(where: MessageWhereInput): BatchPayload!
  createSnapshot(data: SnapshotCreateInput!): Snapshot!
  updateSnapshot(data: SnapshotUpdateInput!, where: SnapshotWhereUniqueInput!): Snapshot
  upsertSnapshot(where: SnapshotWhereUniqueInput!, create: SnapshotCreateInput!, update: SnapshotUpdateInput!): Snapshot!
  deleteSnapshot(where: SnapshotWhereUniqueInput!): Snapshot
  deleteManySnapshots(where: SnapshotWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  contact(where: ContactWhereUniqueInput!): Contact
  contacts(where: ContactWhereInput, orderBy: ContactOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Contact]!
  contactsConnection(where: ContactWhereInput, orderBy: ContactOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ContactConnection!
  history(where: HistoryWhereUniqueInput!): History
  histories(where: HistoryWhereInput, orderBy: HistoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [History]!
  historiesConnection(where: HistoryWhereInput, orderBy: HistoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): HistoryConnection!
  message(where: MessageWhereUniqueInput!): Message
  messages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message]!
  messagesConnection(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MessageConnection!
  snapshot(where: SnapshotWhereUniqueInput!): Snapshot
  snapshots(where: SnapshotWhereInput, orderBy: SnapshotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Snapshot]!
  snapshotsConnection(where: SnapshotWhereInput, orderBy: SnapshotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SnapshotConnection!
  node(id: ID!): Node
}

type Snapshot {
  id: ID!
  conversations(where: HistoryWhereInput, orderBy: HistoryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [History!]
}

type SnapshotConnection {
  pageInfo: PageInfo!
  edges: [SnapshotEdge]!
  aggregate: AggregateSnapshot!
}

input SnapshotCreateInput {
  id: ID
  conversations: HistoryCreateManyInput
}

type SnapshotEdge {
  node: Snapshot!
  cursor: String!
}

enum SnapshotOrderByInput {
  id_ASC
  id_DESC
}

type SnapshotPreviousValues {
  id: ID!
}

type SnapshotSubscriptionPayload {
  mutation: MutationType!
  node: Snapshot
  updatedFields: [String!]
  previousValues: SnapshotPreviousValues
}

input SnapshotSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SnapshotWhereInput
  AND: [SnapshotSubscriptionWhereInput!]
  OR: [SnapshotSubscriptionWhereInput!]
  NOT: [SnapshotSubscriptionWhereInput!]
}

input SnapshotUpdateInput {
  conversations: HistoryUpdateManyInput
}

input SnapshotWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  conversations_every: HistoryWhereInput
  conversations_some: HistoryWhereInput
  conversations_none: HistoryWhereInput
  AND: [SnapshotWhereInput!]
  OR: [SnapshotWhereInput!]
  NOT: [SnapshotWhereInput!]
}

input SnapshotWhereUniqueInput {
  id: ID
}

type Subscription {
  contact(where: ContactSubscriptionWhereInput): ContactSubscriptionPayload
  history(where: HistorySubscriptionWhereInput): HistorySubscriptionPayload
  message(where: MessageSubscriptionWhereInput): MessageSubscriptionPayload
  snapshot(where: SnapshotSubscriptionWhereInput): SnapshotSubscriptionPayload
}
`