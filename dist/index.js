"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
const index_2 = require("./config/index");
const app = (0, express_1.default)();
(0, index_2.dbConnect)();
app.use(express_1.default.json());
app.use('/admin', index_1.adminRoute);
app.use('/vendor', index_1.vendorRoute);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
