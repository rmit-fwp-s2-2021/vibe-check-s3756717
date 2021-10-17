const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const db = require("./src/database");
const graphql = require("./src/graphql");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
// Limit has been increased to handle base64 strings.
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Add CORS suport.
app.use(cors());


// Add GraphQL to express server.
// NOTE: You can use the GraphQL web-interface to test the GraphQL schema thanks to the graphiql parameter being true.
// Access the web-interface when the server is running here: http://localhost:4000/graphql
app.use(
    "/graphql",
    graphqlHTTP({
      schema: graphql.schema,
      rootValue: graphql.root,
      graphiql: true
    })
  );
  
  // Set port, listen for requests.
  const PORT = 4001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });