"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inherit = void 0;
exports.fileExists = fileExists;
exports.searchPath = searchPath;
exports.rm = rm;
const promises_1 = require("fs/promises");
const path_1 = require("path");
async function fileExists(s) {
    try {
        const f = await (0, promises_1.stat)(s);
        return f.isFile();
    }
    catch {
        return false;
    }
}
async function searchPath(filename) {
    const binPath = process.env["NEAR_SANDBOX_BINARY_PATH"];
    if (binPath &&
        binPath.length > 0 &&
        (await fileExists((0, path_1.join)(binPath, filename)))) {
        return binPath;
    }
    return undefined;
}
exports.inherit = "inherit";
async function rm(path) {
    try {
        await (0, promises_1.rm)(path);
    }
    catch (e) { }
}
