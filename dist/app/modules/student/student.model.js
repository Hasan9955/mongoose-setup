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
}, {
    _id: false
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: String,
    fatherOccupation: String,
    fatherContactNo: String,
    motherName: String,
    motherOccupation: String,
    motherContactNo: String,
}, {
    _id: false
});
const localGuardianSchema = new mongoose_1.Schema({
    name: String,
    occupation: String,
    contactNo: String,
    address: String,
}, {
    _id: false
});
const StudentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'user id is required'],
        unique: true,
        ref: 'user'
    },
    name: {
        type: userNameSchema,
        required: true
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
        unique: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: "{VALUE} is not valid email."
        },
        required: [true, 'Email is required.']
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
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester'
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment'
    },
    profilePic: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        virtuals: true
    }
});
//Mongoose virtual method       
StudentSchema.virtual('fullName').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
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
//Query middleware example
//pre save query middleware
StudentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
StudentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
//when we will use aggregate this middleware will work
StudentSchema.pre('aggregate', function (next) {
    // console.log(this.pipeline()); 
    //Output: [ { '$match': { id: '10' } } ] 
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    //Output: [{$match: {isDeleted: {$ne: true}}}, { '$match': { id: '10' } } ]
    next();
});
//creating a custom instance method
// StudentSchema.methods.isUserExists = async function (id: string) {
//     const existingStudent = StudentModel.findOne({ id })
//     return existingStudent;
// }
exports.StudentModel = (0, mongoose_1.model)('Student', StudentSchema);
