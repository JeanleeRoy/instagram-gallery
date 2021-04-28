const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')) // not used

// middlewires
app.use(morgan('dev'))
app.use(express.json());

// routes
app.use(require('./routes'));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})