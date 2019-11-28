import { createConnection as createConnectionTypeORM } from "typeorm";

export const createConnection = async () => {
	// const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
	return createConnectionTypeORM();
};
