export interface Lookup {
    value: string;
    label: string;
  }
 
  
  export interface Lookup_Town extends Lookup {}
  export interface Lookup_Province extends Lookup {}
  export interface Lookup_Interest extends Lookup {}
  export interface Lookup_Gender extends Lookup {}
  export interface Lookup_EducationLevel extends Lookup {}
  export interface Lookup_Municipality extends Lookup {}

  export interface Lookup_Center {
    id: string;
    name: string;
    municipalityId: string;
}

export interface Lookup_Town_by_Province {
  id: string;
  description: string;
  province: string;
}

export interface Lookup_Center_by_Town {
  id: string;
  description: string;
}