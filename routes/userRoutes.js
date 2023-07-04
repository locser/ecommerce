const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//Protect all routes after this middleware
router.use(authController.protect);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);

router.get('/me', userController.getMe, userController.getUser);
router.get('/save-address', userController.saveAddress);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(authController.restrictTo('admin'), userController.deleteUser);

//cart
router.route('/cart').post(userController.userCart);
router.route('/cart/applyCoupon').post(userController.applyCoupon);
router.route('/cart').get(userController.getUserCart);
router.route('/empty-cart').delete(userController.emptyCart);
router.route('/cart/createOrder').post(userController.createOrder);
router.route('/get-orders').get(userController.getOrders);
//TODO: admin -user
router
  .route('/update-order/:id')
  .put(authController.restrictTo('admin'), userController.updateOrderStatus);

module.exports = router;
