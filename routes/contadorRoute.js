const express = require('express');
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('contador/indexContador')
})

router.use("/resources", express.static("public"));
router.use("/resources", express.static(__dirname + "/public"));
module.exports = router;