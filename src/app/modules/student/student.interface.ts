

export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;

}

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}
export interface Student {
    id: string;
    name: UserName;
    gender: "male" | "female";
    dateOfBirth?: string;
    contactNumber: string;
    emergencyContactNo: string;
    bloodGroup?: string;
    email: string;
    profilePic?: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    studentStatus: "active" | "blocked"
}