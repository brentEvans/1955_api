
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/1955_api');

app.use(bodyParser.json());
// app.use(express.static(__dirname + '/static'));

const PersonSchema = new mongoose.Schema({
    name: {type: String}
}, {timestamps: true});
mongoose.model('Person', PersonSchema);
const Person = mongoose.model('Person');



app.get('/', (req, res) => {
    Person.find({}, (err, persons) => {
        if(err){
            console.log("Error:", err);
        } else{
            console.log(persons);
            res.json({status: 'ok', persons: persons});
        }
    });
});

//returns an error! ************************
app.get('/new/:name', (req, res) => {
    var personInstance = new Person({ name: req.params.name });
    // personInstance.name = req.params.name;
    console.log("?????")
    personInstance.save( (err) => {
        if(err){
            console.log("Error:", err);
        } else{
            console.log('hitting the right route');
            res.json({status: 'ok'});
        }
    });
});

//test
app.get('/remove/:name', (req, res) => {
    Person.remove({name: req.params.name}, (err) => {
        if(err){
            console.log("Error:", err);
        } else{
            res.json({status: 'ok'});
        }
    });
});

//test
app.get('/:name', (req, res) => {
    Person.find({name: req.params.name}, (err, person) => {
        if(err){
            console.log("Error:", err);
        } else{
            res.json({status: 'ok', person: person}); 
        }
    });
});




app.listen(8000, () => {
    console.log('listening on port 8000');
});