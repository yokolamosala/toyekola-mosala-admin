import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trainee } from '../api/trainee';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface TraineeResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Trainee[];
}

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  constructor(private http: HttpClient) { }

  getTraineeList(centerId: string, page: number = 0, size: number = 10, sort: string = 'id', direction: string = 'ASC'): Observable<TraineeResponse> {
    return this.http.get<TraineeResponse>(`${environment.APIBase}getPersonApplicationListByCenter`, {
      params: {
        center: centerId,
        page: page.toString(),
        size: size.toString(),
        sort: sort,
        direction: direction
      }
    });
  }

  SaveTrainee(person: Trainee): Observable<Trainee> {
    return this.http.post<Trainee>(`${environment.APIBase}savePerson`, person);
  }

  updateTrainee(person: Trainee): Observable<Trainee> {
    const url = `${environment.APIBase}updatePerson/${person.personId}`; 
    return this.http.post<Trainee>(url, person); // Use PUT method for updating
}
}
