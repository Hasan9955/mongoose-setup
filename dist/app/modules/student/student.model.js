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
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        // trim property will remove the string spaces
        trim: true,
        required: [true, 'First name is required'],
        validate: {
            validator: function (value) {
                const firstCarCapital = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                return value === firstCarCapital;
            },
            message: '{VALUE} is not capitalize!'
        }
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: "{VALUE} is not valid value."
        }
    }
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: String,
    fatherOccupation: String,
    fatherContactNo: String,
    motherName: String,
    motherOccupation: String,
    motherContactNo: String,
});
const localGuardianSchema = new mongoose_1.Schema({
    name: String,
    occupation: String,
    contactNo: String,
    address: String,
});
const StudentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: userNameSchema,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'password should be at last 6 character']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: "{VALUE} is not supported. The gender filed can be one of the following: 'male', 'female' or 'other'",
        },
        required: [true, 'Gender is required']
    },
    email: {
        type: String,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: "{VALUE} is not valid email."
        }
    },
    dateOfBirth: { type: String },
    contactNumber: {
        type: String,
        minlength: [11, 'The length of ContactNO should be 11'],
        maxlength: [11, 'The length of ContactNO should be 11'],
        required: [true, 'ContactNO is required!']
    },
    emergencyContactNo: {
        type: String,
        minlength: [11, 'The length of ContactNO should be 11'],
        maxlength: [11, 'The length of ContactNO should be 11'],
        required: [true, 'ContactNO is required!']
    },
    bloodGroup: { type: String },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    guardian: {
        type: guardianSchema,
        required: true
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true
    },
    studentStatus: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    profilePic: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
});
//creating a custom static method
StudentSchema.statics.isStudentExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingStudent = yield exports.StudentModel.findOne({ id });
        return existingStudent;
    });
};
/*                        MONGOOSE BUILTIN MIDDLEWARE                                */
//Document middleware example
//pre save middleware
StudentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(this, 'pre hook we will save the data');
        const user = this; //this raper the currently processing document.  
        //hashing password and save into db
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt));
        next();
    });
});
//post save middleware
StudentSchema.post('save', function (doc, next) {
    // console.log(this, 'Post hook we saved our data');
    doc.password = ''; // we have empty string the password
    next();
});
//Query middleware example
//pre save query middleware
// StudentSchema.pre('find', function (next){ 
//     console.log(this);
//     next();
// })
//creating a custom instance method
// StudentSchema.methods.isUserExists = async function (id: string) {
//     const existingStudent = StudentModel.findOne({ id })
//     return existingStudent;
// }
exports.StudentModel = (0, mongoose_1.model)('Student', StudentSchema);
