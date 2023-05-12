const express = require('express');
const connectDb = require('./config/dbConnection');
const port = process.env.PORT || 5000;
const app = express();
connectDb();
app.use(express.json());
app.use("/api/users", require("./routes/authRoute"));

app.listen(port, ()=> {
    console.log(`server running at port ${port}`);
})