import { authenticated } from "../../authenticated-guard";
import { validateRole } from "../../validate-role";

export const resolversComposition = {
  "Query.me": [authenticated],
  "Mutation.publishArticle": [authenticated, validateRole("TESTE")],
  "Query.serverTime": [authenticated]
};
