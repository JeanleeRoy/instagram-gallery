const express = require('express');
const morgan = require('morgan');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000)

// middlewires
app.use(morgan('dev'), )

// routes
app.use(require('./routes'));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})