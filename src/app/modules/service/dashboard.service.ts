import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationCount, GenderGroup, Interests, PersonAgeGroup } from '../api/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getRegisteredApplicantCount(): Observable<ApplicationCount> {
    return this.http.get<ApplicationCount>(environment.APIBase + 'getStatisticCount');
  }

  getRegisteredByAgeGroupCount(): Observable<PersonAgeGroup[]> {
    return this.http.get<PersonAgeGroup[]>(environment.APIBase + 'getPersonCountByAgeGroup');
  }

  getRegisteredByGenderGroupCount(): Observable<GenderGroup[]> {
    return this.http.get<GenderGroup[]>(environment.APIBase + 'genderCounts');
  }

  getRegisteredByInterestCount(): Observable<Interests[]> {
    return this.http.get<Interests[]>(environment.APIBase + 'interestCounts');
  }
}
