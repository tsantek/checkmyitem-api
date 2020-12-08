module.exports = app => {
    const user = require("../controllers/userController.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", user.create);

    router.get("/", user.findAll);

    app.use('/user', router);

}  