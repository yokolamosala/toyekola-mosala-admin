import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationCount, EducationLevel, GenderGroup, Interests, ParticipantCount, PersonAgeGroup } from '../api/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getRegisteredApplicantCount(centerId: string): Observable<ApplicationCount> {
    return this.http.get<ApplicationCount>(`${environment.APIBase}getStatisticCount?centerId=${centerId}`);
  }

  getRegisteredParticipantCount(): Observable<number> {
    return this.http.get<number>(`${environment.APIBase}fikinAttendanceCounts`);
}

  getRegisteredByAgeGroupCount(centerId: string): Observable<PersonAgeGroup[]> {
    return this.http.get<PersonAgeGroup[]>(`${environment.APIBase}getPersonCountByAgeGroup?centerId=${centerId}`);
  }

  getRegisteredByGenderGroupCount(centerId: string): Observable<GenderGroup[]> {
    return this.http.get<GenderGroup[]>(`${environment.APIBase}genderCounts?centerId=${centerId}`);
  }

  getRegisteredByInterestCount(centerId: string): Observable<Interests[]> {
    return this.http.get<Interests[]>(`${environment.APIBase}interestCounts?centerId=${centerId}`);
  }

  getRegisteredByEduLevelCount(centerId: string): Observable<EducationLevel[]> {
    return this.http.get<EducationLevel[]>(`${environment.APIBase}eduLevelCounts?centerId=${centerId}`);
  }
}
