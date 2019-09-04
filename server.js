let app = require('express')(),
    server = require('http').Server(app),
    bodyParser = require('body-parser')
    express = require('express'),
    cors = require('cors'),
    http = require('http'),
    path = require('path');
    
let districtsRoute = require('./Routes/districts'),
    schoolsRoute = require('./Routes/schools'), 
    util = require('./Utilities/util');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

app.use(cors());

app.use(function(err, req, res, next) {
  return res.send({ "statusCode": util.statusCode.ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG });
});

app.use('/districts', districtsRoute);
app.use('/schools', schoolsRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next();
}); 
       
/*first API to check if server is running*/
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/src/index.html'));
})

  

server.listen(3001,function(){
    console.log('app listening on port: 3001');
});
