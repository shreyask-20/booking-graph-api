const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/bookingSchema");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(5000, () => console.log("Server running on port 5000"));
