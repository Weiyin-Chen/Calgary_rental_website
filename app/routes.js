var mongoose = require('mongoose');
var User = require('./model.js');

module.exports = function(app) {

    
    // Retrieve records for all data in the db
    app.get('/users', function(req, res){

        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            res.json(users);
        });
    });

    // Provides method for saving new data in the db
    app.post('/users', function(req, res){ 
        var newuser = new User(req.body);
        //find if the new address already exits in the db
        User.find({address: req.body.address}, function(err, result) {
            //if no, save the new data
            if (result.length == 0) {
            newuser.save(function(err){
                if(err)
                    res.send(err);
                res.json(req.body);
            });
            //if yes, update the document which has the same address
            } else {
                result[0].sum += 1;
                result[0].title.push(req.body.title[0]);
                result[0].price.push(req.body.price[0]);
                result[0].description.push(req.body.description[0]);
                result[0].contact.push(req.body.contact[0]);
                result[0].save(function (err) {});
            }
        }); 
    });
};  