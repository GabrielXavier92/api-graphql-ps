import { User } from "./../modules/auth/auth-helpers";
import { Request } from "express";

export type Resolver = (parent: any, args: any, context: Context, info: any) => any;

export interface ResolverMap {
	[key: string]: {
		[key: string]: Resolver;
	};
}

export interface Context {
	req: Request;
	authToken: string;
	currentUser: User;
}
