const mongoose = require("mongoose");
const  connectDb = async () => {
    try {
        const connect = await mongoose.connect(`mongodb+srv://blaqshyd:blaqshyd@chatbox.7ibdwfx.mongodb.net/chatboxAuth?retryWrites=true&w=majority
        `);
        console.log('Database connected to', connect.connection.name,);
    } catch (err) {
        console.log(err);
        process.exit(1);
        
    }
}

module.exports = connectDb;

