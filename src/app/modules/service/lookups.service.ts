import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lookup_Center, Lookup_Center_by_Town, Lookup_EducationLevel, Lookup_Gender, Lookup_Interest, Lookup_Municipality, Lookup_Province, Lookup_Town, Lookup_Town_by_Province } from '../api/lookups';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  constructor(private http: HttpClient) { }

  getLookupTown(): Observable<Lookup_Town[]> {
    return this.http.get<Lookup_Town[]>(environment.LookupBase + 'town');
  }

  getLookupProvince(): Observable<Lookup_Province[]> {
    return this.http.get<Lookup_Province[]>(environment.LookupBase + 'province');
  }

  getLookupInterest(centerId: string): Observable<Lookup_Interest[]> {
    return this.http.get<Lookup_Interest[]>(`${environment.LookupBase}${centerId}/interests`);
}

getLookupInterestWithout(): Observable<Lookup_Interest[]> {
  return this.http.get<Lookup_Interest[]>(`${environment.LookupBase}interest`);
}

getLookupTownbyProvince(provinceId: string): Observable<Lookup_Town_by_Province[]> {
  return this.http.get<Lookup_Town_by_Province[]>(`${environment.LookupBase}${provinceId}/town-by-province`);
}

getLookupCenterbyTown(townId: string): Observable<Lookup_Center_by_Town[]> {
  return this.http.get<Lookup_Center_by_Town[]>(`${environment.LookupBase}${townId}/centers-by-town`);
}
  getLookupGender(): Observable<Lookup_Gender[]> {
    return this.http.get<Lookup_Gender[]>(environment.LookupBase + 'gender');
  }

  getLookupEducation(): Observable<Lookup_EducationLevel[]> {
    return this.http.get<Lookup_EducationLevel[]>(environment.LookupBase + 'education-level');
  }

  getLookupMunicipality(): Observable<Lookup_Municipality[]> {
    return this.http.get<Lookup_Municipality[]>(environment.LookupBase + 'municipality');
  }

  getCenters(municipalityId?: string): Observable<Lookup_Center[]> {
    let params = new HttpParams();

    // Conditionally add the municipalityId if it's provided
    if (municipalityId) {
        params = params.set('municipalityId', municipalityId);
    }

    return this.http.get<Lookup_Center[]>(`${environment.LookupBase}centers`, { params });
}

}
