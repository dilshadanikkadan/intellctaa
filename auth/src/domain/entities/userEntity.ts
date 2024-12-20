import { ObjectId } from "mongoose";
interface SocialMedia {
  instagram?: string;
  linkedIn?: string;
  github?: string;
}

interface Contact {
  additionalEmail?: string;
  phone?: string;
  socialMedia?: SocialMedia;
}

enum Role {
  student = "student",
  instructor = "instructor",
  admin = "admin",
}

export interface UserEntity {
  _id?: ObjectId;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password?: string;
  role: Role;
  profile?: string;
  contact?: Contact;
  isBlocked?: boolean;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isAdmin?:boolean;
  isInstructor?:boolean;
  refreshToken?:string;
  isAuth?:boolean;
  otp?: string;
  otpExp?: string;
  profession?: string;
}
