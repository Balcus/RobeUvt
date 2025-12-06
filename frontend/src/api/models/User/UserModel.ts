export interface UserModel {
  readonly id: number;
  readonly userCode: string;
  mail: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  gender: number | null;
  role: number;
  gownSize: number | null;
  capSize: number | null;
  address: string | null;
  country: string | null;
  city: string | null;
  studyCycle: number | null;
  facultyId: number;
  studyProgram: string | null;
  promotion: number | null;
  doubleSpecialization: boolean;
  doubleCycle: boolean;
  doubleFaculty: boolean;
  doubleStudyProgram: boolean;
  specialNeeds: boolean;
  mobilityAccess: boolean;
  extraAssistance: boolean;
  otherNeeds: string | null;
  createdAt: string;
}
