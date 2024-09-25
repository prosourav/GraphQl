import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import typeDefs from './schemaGql.js';
import resolvers from './resolvers.js';

import mongoose from 'mongoose';
import { MONGO_URI } from './config.js';

//import models here
import './models/Quotes.js';
import './models/User.js';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ]
});

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
