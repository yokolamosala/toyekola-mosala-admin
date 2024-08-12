import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trainee } from '../api/trainee';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  constructor(private http: HttpClient) { }

  getTraineeList(): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(environment.APIBase + 'getPersonApplicationList');
  }
}
