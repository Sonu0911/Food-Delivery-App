"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    reviews: {
        type: Number,
        required: true,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});
const RestaurantModel = (0, mongoose_1.model)('restaurant', restaurantSchema);
exports.default = RestaurantModel;
