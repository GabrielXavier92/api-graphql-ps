import { validateRole } from "../utils/validate-role";
import { authenticated } from "../utils/authenticated-guard";

export const resolversComposition = {
	"Query.me": [authenticated],
	"Mutation.publishArticle": [authenticated, validateRole("TESTE")],
	"Query.serverTime": [authenticated]
};
