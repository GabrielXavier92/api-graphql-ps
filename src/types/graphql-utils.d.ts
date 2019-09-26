import { Request } from "express";

export type Resolver = (parent: any, args: any, context: { req: Request }, info: any) => any;

export interface ResolverMap {
	[key: string]: {
		[key: string]: Resolver;
	};
}
