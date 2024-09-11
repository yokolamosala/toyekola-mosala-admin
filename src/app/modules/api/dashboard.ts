export interface Dashboard {
}

export interface ApplicationCount {
    totalApplicationCount: number;
    totalApplicationCountForDay: number;
  }

  export interface PersonAgeGroup {
    ageGroup: string;
    personCount: number;
  }

  export interface GenderGroup {
    gender: string;
    personCount: number;
  }

  export interface Interests {
    interest: string;
    personCount: number;
  }

  export interface EducationLevel {
    educationLevel: string;
    personCount: number;
  }