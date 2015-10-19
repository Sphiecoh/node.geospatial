// Dependencies
var mongoose        = require('mongoose');
var User            = require('./model.js');


// Opens App Routes
module.exports = function(app, passport) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/users', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = User.find({});
        query.exec(function(err, users){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(users);
        });
    });
    
    app.post('/users/near',function(req, res){
        console.log(req.body);
         var query = User.find({'location':{$near:{$geometry:{type:'Point',coordinates :[parseFloat(req.body.long), parseFloat(req.body.lat)]},$maxDistance: 100000}}});
        query.exec(function(err,users)
        {
                    if(err){
                
            console.log(err);
                res.send(err);
                }
 else{
            // If no errors are found, it responds with a JSON of all users
            console.log(users);
            res.json(users);
 }
                   });
    });
    
    
    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/users', function(req, res){

        // Creates a new User based on the Mongoose schema and the post bo.dy
        var newuser = new User(req.body);
      
      // New User is saved in the db.
        newuser.save(function(err){
            if(err){
                console.log(err);
                res.json(err);
}
else{

            // If no errors are found, it responds with a JSON of the new user
            res.json(req.body);
}
        });
    });
    
    app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
    app.get('/auth/google/return',passport.authenticate('google', {
                    successRedirect : '#/profile',
                    failureRedirect : '/'
            }));
    
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
            
    
};
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
