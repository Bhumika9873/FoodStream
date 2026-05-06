// start server
console.log("🔥 SERVER FILE RUNNING 🔥");

require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
 
async function startServer() {
    await connectDB();
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

startServer();