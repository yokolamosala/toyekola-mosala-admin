import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CenterSelectionService {

  constructor() { }

   // BehaviorSubject to hold the selected center value
   private selectedCenterSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

   // Observable to expose the selected center value
   selectedCenter$: Observable<string | null> = this.selectedCenterSubject.asObservable();
 
   // Method to set the selected center
   setSelectedCenter(centerId: string): void {
     this.selectedCenterSubject.next(centerId);
   }
}
