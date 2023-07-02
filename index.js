const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const { notFound, errorHandler } = require('./middleware/errorHandle');
const dbConnect = require('./config/dbConnect');
const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const blogRoute = require('./routes/blogRoutes');
// const categoryRoute = require('./routes/categoryRoutes');
const prodCategoryRoute = require('./routes/prodCategoryRoutes');
const blogCategoryRoute = require('./routes/blogCategoryRoutes');
const brandRoute = require('./routes/brandRoutes');
const couponRoute = require('./routes/couponRoutes');

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
app.use('/api/blog', blogRoute);
// app.use('/api/category', categoryRoute);
app.use('/api/blogCategory', blogCategoryRoute);
app.use('/api/prodCategory', prodCategoryRoute);
app.use('/api/brand', brandRoute);
app.use('/api/coupon', couponRoute);

// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server listening on port : ' + PORT);
});
