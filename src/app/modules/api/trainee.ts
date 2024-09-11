export interface PersonAddress {
  personAddressId?: number;
  street?: string;
  municipality?: string;
  city?: string;
  province?: string;
  country?: string;
  zipCode?: string;
  createDate?: string;
}

export interface PersonInterest {
  interestId?: number;
  interest?: string;
  createDate?: string;
}

export interface Trainee {
  personId?: number;
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  idNumber?: string;
  passportNumber?: string;
  email?: string;
  street?: string;
  cellphoneNumber?: string;
  educationLevel?: string;
  center?: string;
  createDate?: string;
  personAddress?: PersonAddress;
  personInterest?: PersonInterest;
}
