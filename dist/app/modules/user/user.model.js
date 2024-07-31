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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const config_1 = __importDefault(require("../../config"));
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'password should be at last 6 character']
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
//pre save middleware
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(this, 'pre hook we will save the data');
        const user = this; //this raper the currently processing document.  
        //hashing password and save into db
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt));
        next();
    });
});
//post save middleware
UserSchema.post('save', function (doc, next) {
    // console.log(this, 'Post hook we saved our data');
    doc.password = ''; // we have empty string the password
    next();
});
exports.UserModel = (0, mongoose_1.model)('user', UserSchema);
