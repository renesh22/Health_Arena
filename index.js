const express = require('express')
const path = require('path')
const cors = require('cors')
var mongoose = require('mongoose')

const app = express();
const port = process.env.PORT || 3000;

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    date: String,
    time: String,
    message: String
});

var Contact = mongoose.model('Contact', contactSchema);

app.use('/images', express.static('images'))
app.use(express.urlencoded())
app.use(cors())

app.get('/' ,(req,res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/contact', (req,res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.sendFile(path.join(__dirname, './response.html'));
        console.log(myData)
    }).catch((e) => {
        res.send(e);
    })
})

app.listen(port, () => {
    console.log(`App started on ${port}`)
})

mongoose.connect('mongodb+srv://renesh69:renesh43@cluster0.fvxks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));

db.once('open', function(){
    console.log("We are connected");
})