const controller = require("../controllers/report.controller");

module.exports = function (app) {
    const upload = require("../middleware/upload");

    app.get("/api/reports", controller.findAll);
    app.get("/api/reports/:id", controller.findOne);
    app.post("/api/reports", upload.array('photos', 3), controller.create);
    app.patch("/api/reports/:id/status", controller.updateStatus);
};
