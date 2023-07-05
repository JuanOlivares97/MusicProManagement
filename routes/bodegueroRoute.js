const express = require('express');
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('bodeguero/indexBodeguero')
})


router.use("/resources", express.static("public"));
router.use("/resources", express.static(__dirname + "/public"));
module.exports = router;