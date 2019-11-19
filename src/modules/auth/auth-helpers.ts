import * as jwt from "jsonwebtoken";
import * as jwksClient from "jwks-rsa";

export interface User {
	id: string;
	name: string;
	// roles: [String];
}

const client = jwksClient({
	jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const options = {
	audience: `${process.env.CQLwdZTZH27uQgqDh0rqYMy70WBlVOm0}`,
	issuer: `https://${process.env.AUTH0_DOMAIN}/`,
	algorithms: ["RS256"]
};

export const tradeTokenForUser = async (token: string) => {
	return await jwt.verify(token, getKey, options);
	// const { id, name } = decoded as User;
	// return {
	// 	id,
	// 	name
	// };
};

const getKey = (header: any, cb: any) => {
	client.getSigningKey(header.kid, (_, key: any) => {
		var signingKey = key.publicKey || key.rsaPublicKey;
		cb(null, signingKey);
	});
};
