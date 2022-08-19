const express = require("express");
const router = express.Router();


router.route('/:itemkey').get().post()
router.route('/:commentkey').put().delete()



module.exports = router;