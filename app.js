var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var statsRouter = require('./routes/stats');
var logsRouter = require('./routes/logs');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/favicon.ico', (req, res) => res.status(204));

// Middleware to set the active class
app.use((req, res, next) => {
    res.locals.activeClass = {
        home: req.path === '/',
        users: req.path === '/users',
        logs: req.path === '/logs',
        stats: req.path === '/stats'
    };
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/logs', logsRouter);
app.use('/stats', statsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
