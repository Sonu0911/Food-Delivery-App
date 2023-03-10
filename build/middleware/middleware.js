"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers["x-api-key"];
        if (!token) {
            return res.status(404).send({ status: false, msg: "please enter token" });
        }
        let decodeToken = jsonwebtoken_1.default.verify(token, "Rushi-159");
        if (!decodeToken) {
            return res.status(400).send({ status: false, msg: "invalid token" });
        }
        req.body.userId = decodeToken.userId;
        next();
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};
exports.authenticate = authenticate;
exports.default = exports.authenticate;
