import { ResolverMap } from "../../types/graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    me: (root, args, { currentUser }) => currentUser
  },
  User: {
    id: user => user._id,
    username: user => user.username
  }
};
