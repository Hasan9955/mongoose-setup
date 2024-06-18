

export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked'
    isDeleted: boolean;
}

export interface NewUser {
    id: string,
    password: string,
    role: 'admin' | 'student' | 'faculty';
}