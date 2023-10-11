const Router = require('express');
const router = new Router();
const contactRouter = require('./contactRouter');

router.use('/contact', contactRouter);

module.exports = router;
