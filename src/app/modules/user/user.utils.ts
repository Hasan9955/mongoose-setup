import { TAcademicSemester } from './../academicSemester/academicSemester.interface'; 
import { UserModel } from "./user.model";



const findLastStudentId = async () =>{ 
   const studentId = await UserModel.findOne({
      
   }, {
      id: 1,
      _id: 0
   })
   .sort({createdAt: -1})
   .lean() 

   return studentId?.id ? studentId.id.substring(6) : null; 

}

 //Generate id
 export const generateStudentId = async (payload: TAcademicSemester) => { 

    const currentId = await findLastStudentId() || (0).toString(); 

    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

    incrementId  = `${payload.year}${payload.code}${incrementId}`

    return incrementId;

 }