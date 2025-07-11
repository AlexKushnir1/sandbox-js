"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSUrl = AWSUrl;
exports.getBinary = getBinary;
const _1 = require(".");
const path_1 = require("path");
const os = require("os");
const DEFAULT_NEAR_SANDBOX_VERSION = "2.6.3";
function getPlatform() {
    const type = os.type();
    const arch = os.arch();
    // Darwind x86_64 is not supported for quite some time :(
    if (type === "Linux" && arch === "x64") {
        return [type, "x86_64"];
    }
    else if (type === "Darwin" && arch === "arm64") {
        return [type, "arm64"];
    }
    throw new Error(`Unsupported platform: ${type} ${arch}`);
}
function AWSUrl() {
    const [platform, arch] = getPlatform();
    return `https://s3-us-west-1.amazonaws.com/build.nearprotocol.com/nearcore/${platform}-${arch}/${DEFAULT_NEAR_SANDBOX_VERSION}/near-sandbox.tar.gz`;
}
function getBinary(name = "near-sandbox") {
    if (!process.env["NEAR_SANDBOX_BIN_PATH"]) {
        process.env["NEAR_SANDBOX_BINARY_PATH"] = (0, path_1.join)(os.homedir(), ".near", "sandbox");
    }
    // Will use version after publishing to AWS
    // const version = require("./package.json").version;
    const fromEnv = process.env["SANDBOX_ARTIFACT_URL"];
    const urls = [AWSUrl()];
    if (fromEnv) {
        urls.unshift(fromEnv);
    }
    return _1.Binary.create(name, urls);
}
