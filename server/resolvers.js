import { log } from 'console';
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
  Mutation: {
    signupUserDummy: (_, { userNew }) => {
      const id = randomBytes(5).toString("hex");
      users.push({
        id,
        ...userNew
      })
      return users.find(user => user.id == id)
    }
  }

};

export default resolvers;
