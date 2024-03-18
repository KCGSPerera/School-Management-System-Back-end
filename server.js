require("dotenv").config();
const http = require("http");
require("./config/dbConnect")
const app = require("./app/app")

const PORT = process.env.PORT || 2020

// server
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is up and running on port ${PORT}`));



// MongoDB Username - Gavithra
// MongoDB Password - GaviMongo