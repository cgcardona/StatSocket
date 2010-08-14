
/**
 * Module dependencies.
 */

var express = require('express'),
    connect = require('connect');

// Create and export Express app

var app = express.createServer();

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.use(connect.bodyDecoder());
    app.use(connect.methodOverride());
    app.use(connect.compiler({ src: __dirname + '/public', enable: ['less'] }));
    app.use(connect.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
    app.set('reload views', 1000);
    app.use(connect.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
   app.use(connect.errorHandler());
});

// Routes

app.get('/', function(req, res){
    res.render('index.ejs', {
        locals: {
            title: 'SocketStats - Real Time Web Analytics Using HTML5 WebSockets'
        }
    });
});

app.post('/stats', function(req, res){
    res.render('stats.ejs', {
        locals: {
            title: 'Stats'
        }
    });
});

app.get('/stats', function(req, res){
    res.render('showstats.ejs', {
        locals: {
            title: 'These are your Nasty Stats'
        }
    });
});
app.listen(3000);
console.log("listening on port 3000")