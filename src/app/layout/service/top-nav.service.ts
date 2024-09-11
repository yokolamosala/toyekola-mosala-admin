import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Lookup_Center } from 'src/app/modules/api/lookups';

@Injectable({
  providedIn: 'root'
})
export class TopNavService {

  constructor(private http:HttpClient) { }

  getLookupCenter(): Observable<Lookup_Center[]> {
    return this.http.get<Lookup_Center[]>(environment.LookupBase + 'centers');
  }
}
