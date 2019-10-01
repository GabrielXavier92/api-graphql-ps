import * as jwt from "jsonwebtoken";

export interface User {
	id: string;
	name: string;
	// roles: [String];
}

export const tradeTokenForUser = async (token: string) => {
	var decoded = await jwt.verify(token, process.env.JWT_SECRET as string);
	const { id, name } = decoded as User;
	return {
		id,
		name
	};
};
