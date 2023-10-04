"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
main().catch(err => console.log(err));
async function main() {
    await mongoose_1.default.connect('mongodb://127.0.0.1:27017/delivery-app');
}
exports.dbConnect = main;
