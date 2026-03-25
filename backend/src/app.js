const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes'); //Import route Auth
const productRoutes = require('./routes/product.routes'); //Import route Product

const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Đăng ký các routes ở đây:
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes); //Đăng ký endpoint /api/auth
app.use('/api/products', productRoutes); //Đăng ký endpoint /api/products

//Xử lý lỗi luôn phải nằm cuối cùng:
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
