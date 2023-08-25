const express = require('express');
const router = express.Router();
const {addFriend,getFriends} = require('../controllers/firend');

const authorization = require('../middleware/Authorization');
const authentication = require("../middleware/authentication");

router.post('/addFriend',authentication,authorization('CREATE_COMMENTS') ,addFriend);
router.get('/getFriends/:userId', authentication,authorization('CREATE_COMMENTS'),getFriends);


module.exports = router;
