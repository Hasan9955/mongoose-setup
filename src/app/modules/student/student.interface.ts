

import { Model } from "mongoose";


export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;

}

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}
export interface TStudent {
    id: string;
    password: string;
    name: TUserName;
    gender: "male" | "female" | "other";
    dateOfBirth?: string;
    contactNumber: string;
    emergencyContactNo: string;
    bloodGroup?: string;
    email: string;
    profilePic?: string
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    studentStatus: "active" | "blocked",
    isDeleted: boolean
};




// this is the example of mongoose static methods
export interface TStudentModel extends Model<TStudent> {
    isStudentExists (id: string): Promise<TStudent | null>
}





//This is the example of mongoose instance methods
// export type TStudentMethods = {
//     isUserExists(id: string): Promise<TStudent | null>
// }


// export type TStudentModel = Model<
//     TStudent,
//     Record<string, never>,
//     TStudentMethods>