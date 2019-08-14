// const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const pathDir = require('./util/path');
const shopRouter = require('./routes/shop');
const adminRouter = require('./routes/admin');

app.set('view engine', 'pug');
app.set('views', 'views');

// app.use tham khảo (https://expressjs.com/en/4x/api.html#app.use)
// parser body cho POST method via body-parser backage
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(pathDir, 'public')));


app.use('/admin', adminRouter);
app.use(shopRouter);

// app.listen(8080) tương đương (https://github.com/expressjs/express/blob/master/lib/application.js)
// const server = http.createServer(app);
// server.listen(8080);
app.listen(8080);