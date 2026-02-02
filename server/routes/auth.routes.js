const controller = require("../controllers/auth.controller");
const upload = require("../middleware/upload");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/register", controller.register);
    app.post("/api/auth/login", controller.login);
    app.post("/api/auth/reset-password", controller.resetPassword);
    app.put("/api/auth/profile/:id", upload.single('photo'), controller.updateProfile);
};
