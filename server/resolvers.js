import { quotes, users } from './fakedb.js';
import { randomBytes } from "crypto";

const resolvers = {
  Query: {
    greet: () => "Hello world!",
    users: () => users,
    user: (_, par) => users.find((user) => user.id === par.id),
    quote: (_, par) => quotes.filter((quote) => quote.by === par.id),
    quotes: () => quotes,
  },
  User: {
    quotes: (ur) => quotes.filter((quote) => ur.id === quote.by) // Changed 'user' to 'quote'
  },
  Mutation: { // Added Mutation for signUpUser
    signUpUser: (_, { firstName, lastName, email, password }) => {
      const id = randomBytes(5).toString("hex");
      const newUser = { id, firstName, lastName, email, password };
      users.push(newUser);
      return newUser; // Return the newly created user
    },
  },
};

export default resolvers;
