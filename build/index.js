"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const connect = __importStar(require("./config/config"));
const restaurantRoute_1 = __importDefault(require("./routes/restaurantRoute"));
const foodRoute_1 = __importDefault(require("./routes/foodRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const reviewRoute_1 = __importDefault(require("./routes/reviewRoute"));
const sellerRoute_1 = __importDefault(require("./routes/sellerRoute"));
const couponRoute_1 = __importDefault(require("./routes/couponRoute"));
const multer_1 = __importDefault(require("multer"));
const ngrok_1 = __importDefault(require("ngrok"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
(async function () {
    await ngrok_1.default.connect();
})();
connect.connects();
app.use('/', userRoute_1.default, restaurantRoute_1.default, foodRoute_1.default, categoryRoute_1.default, orderRoute_1.default, reviewRoute_1.default, sellerRoute_1.default, couponRoute_1.default);
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000));
});
