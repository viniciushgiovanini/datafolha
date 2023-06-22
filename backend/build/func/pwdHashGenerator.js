"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.hashPWD = void 0;
const bt = require("bcrypt");
const hashPWD = (pwdOri) => __awaiter(void 0, void 0, void 0, function* () {
    const hashGenerator = yield bt.hash(pwdOri, 10);
    return hashGenerator;
});
exports.hashPWD = hashPWD;
const compareHash = (hash, noHash) => __awaiter(void 0, void 0, void 0, function* () {
    const isMatch = yield bt.compare(noHash, hash);
    return isMatch;
});
exports.compareHash = compareHash;
//# sourceMappingURL=pwdHashGenerator.js.map