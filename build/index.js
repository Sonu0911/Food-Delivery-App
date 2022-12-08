"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const config_1 = __importDefault(require("./config/config"));
const restaurantRoute_1 = __importDefault(require("./routes/restaurantRoute"));
const foodRoute_1 = __importDefault(require("./routes/foodRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
console.log(__dirname);
app.use('/public', express_1.default.static(__dirname + '/uploads'));
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/uploads');
        }, filename: function (req, file, cb) {
            cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        }
    })
}).single("userFile");
app.post('/api/file', exports.upload, (req, res) => {
    try {
        const imagePath = req.file.filename;
        return res.status(200).send({ status: true, msg: "file uploaded", url: "http://localhost:3000/public/" + imagePath });
    }
    catch (e) {
        console.log(e);
    }
});
(0, config_1.default)();
app.use('/', userRoute_1.default, restaurantRoute_1.default, foodRoute_1.default, categoryRoute_1.default, orderRoute_1.default);
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000));
});
