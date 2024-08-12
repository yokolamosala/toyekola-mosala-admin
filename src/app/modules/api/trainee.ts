export interface PersonAddress {
    street?: string;
    municipality?: string;
    city?: string;
    province?: string;
    country?: string;
    zipCode?: string;
  }
  
  export interface PersonInterest {
    interest?: string;
  }
  
  export interface Trainee {
    title?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: string;
    idNumber?: string;
    passportNumber?: string;
    email?: string;
    cellphoneNumber?: string;
    educationLevel?: string;
    personAddress?: PersonAddress;
    personInterests?: PersonInterest[];
  }
  
