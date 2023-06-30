const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middleware/errorHandle');

const app = express();

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5000;

//connect to database
dbConnect();

//other
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route routes
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);

// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server listening on port : ' + PORT);
});
