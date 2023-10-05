"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = async () => {
    mongoose_1.default.connect(process.env.MONGO_URI)
        .then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.error(err);
    });
};
exports.dbConnect = dbConnect;
