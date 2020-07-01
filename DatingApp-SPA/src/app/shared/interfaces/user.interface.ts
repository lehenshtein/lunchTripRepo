import {IPhoto} from '@shared/interfaces/photo.interface';

export interface IUser {
  id: number;
  role: string;
  username: string;
  knownAs: string;
  age: number;
  dateOfBirth: Date;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: IPhoto[];
}
