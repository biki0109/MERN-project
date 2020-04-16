const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

uri = "mongodb+srv://biki0109:quockhanh911@cluster0-cxqxl.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, dbName: "ASE"});
connection = mongoose.connection;
connection.once('open', () => {
    console.log("CONNECTED");
})



//app.use('/users', usersRouter);
app.use('/trainings', require('./routes/trainings.route'));
app.use('/packs', require('./routes/packs.route'));

app.use('/users',  require('./routes/users.route'));
//app.use('/trainings', require('./routes/trainings'));
app.use('/items',  require('./routes/items.route'));
app.use('/auth', require('./routes/auth.route'));


app.listen(port, () => { console.log(`LISTENING ON ${port}`)});

