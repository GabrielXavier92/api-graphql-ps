export interface User {
  _id: string;
  username: string;
  roles: [String];
}

export async function tradeTokenForUser(token: string): Promise<User> {
  // Here, use the `token` argument, check it's validity, and return
  // the user only if the token is valid.
  // You can also use external auth libraries, such as jsaccounts / passport, and
  // trigger it's logic from here.
  return { _id: "12345", username: "USER", roles: ["TESTE"] };
}
