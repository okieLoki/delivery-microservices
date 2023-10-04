"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
const index_2 = require("./config/index");
const app = (0, express_1.default)();
(0, index_2.dbConnect)().catch((err) => {
    console.error(err);
});
app.use(express_1.default.json());
app.use('/admin', index_1.adminRoute);
app.use('/vendor', index_1.vendorRoute);
app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
