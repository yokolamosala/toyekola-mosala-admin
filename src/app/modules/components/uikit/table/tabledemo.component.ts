import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/modules/api/customer';
import { CustomerService } from 'src/app/modules/service/customer.service';
import { Product } from 'src/app/modules/api/product';
import { ProductService } from 'src/app/modules/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TraineeResponse, TraineeService } from 'src/app/modules/service/trainee.service';
import { PersonInterest, Trainee } from 'src/app/modules/api/trainee';
import { Lookup_Center, Lookup_Center_by_Town, Lookup_EducationLevel, Lookup_Gender, Lookup_Interest, Lookup_Municipality, Lookup_Province, Lookup_Town, Lookup_Town_by_Province } from 'src/app/modules/api/lookups';
import { LookupsService } from 'src/app/modules/service/lookups.service';
import { CenterSelectionService } from 'src/app/center-selection.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tabledemo.component.html',
    providers: [MessageService, ConfirmationService]
})
export class TableDemoComponent implements OnInit {

    loading: boolean = true;
    trainee: Trainee[] =[];

    traineeDialog: boolean = false;
    submitted: boolean = false;
    selectedTrainee: Trainee = {
        personAddress: {},
        personInterest: {} 
    };

    towns: Lookup_Town[] = [];
    provinces: Lookup_Province[] = [];
    interests: Lookup_Interest[] = [];
    genders: Lookup_Gender[] = [];
    educationLevels: Lookup_EducationLevel[] = [];
    municipalities: Lookup_Municipality[] = [];
    centers: Lookup_Center[] = [];

    selectedMunicipality: string | null = null;
    selectedCenter: string | null = null; 
    selectedInterest: PersonInterest | null = null;
    selectedProvince: string | null = null;
    selectedTown: string | null = null;

    @ViewChild('filter') filter!: ElementRef;

    // Dropdown options
    titles: { label: string, value: string }[] = [
        { label: 'Mr.', value: 'Mr.' },
        { label: 'Ms.', value: 'Ms.' },
        { label: 'Dr.', value: 'Dr.' },
        { label: 'Prof.', value: 'Prof.' }
    ];

    constructor( private traineeService: TraineeService, private lookupService: LookupsService, 
        private centerSelectionService: CenterSelectionService, private confirmationService: ConfirmationService,
        private messageService: MessageService ) { }

        ngOnInit() {
                    
            // Subscribe to the selected center and fetch trainee list based on centerId
            this.centerSelectionService.selectedCenter$.subscribe((centerId: string | null) => {
                if (centerId) {
                    // Set the selected center
                    this.selectedCenter = centerId;
        
                    // Fetch the trainees using the initial page and size
                    this.loadTraineeData(centerId, 0, 10, 'id', 'ASC');
        
                    // Fetch lookup data
                    this.getLookupData(centerId);
                }
            });
        
            // Lazy load trainees on component initialization
            this.loadTraineesLazy({ first: 0, rows: 10 });
        }
      
      // Method to load trainee data based on selected center and pagination
      loadTraineeData(centerId: string, page: number = 0, size: number = 10, sort: string = 'id', direction: string = 'ASC'): void {
        this.loading = true; // Set loading to true before the data is fetched
        this.traineeService.getTraineeList(centerId, page, size, sort, direction).subscribe((response: TraineeResponse) => {
          this.trainee = response.content;
          console.log(this.trainee);
          
      
          this.loading = false; // Turn off loading after data is fetched
        });
      }

      mapInterestLabel(interestCode: string): string {
        const interest = this.interests.find(item => item.value === interestCode);
        return interest ? interest.label : 'Unknown Interest';
      }
      
      // Lazy load handler to pass pagination details
      loadTraineesLazy(event: any): void {
        const page = event.first / event.rows;
        const size = event.rows;
      
        if (this.selectedCenter) {
          this.loadTraineeData(this.selectedCenter, page, size, 'id', 'ASC');
        }
      }

      getLookupData(centerId: string): void {
        this.lookupService.getLookupTown().subscribe((data: Lookup_Town[]) => {
          this.towns = data;
        });
    
        this.lookupService.getLookupProvince().subscribe((data: Lookup_Province[]) => {
          this.provinces = data;
          
        });
    
        this.lookupService.getLookupInterest(centerId).subscribe((data: Lookup_Interest[]) => {
            this.interests = data; 
            
        });
    
        this.lookupService.getLookupGender().subscribe((data: Lookup_Gender[]) => {
          this.genders = data;
        });
    
        this.lookupService.getLookupEducation().subscribe((data: Lookup_EducationLevel[]) => {
          this.educationLevels = data;
        });

        this.lookupService.getLookupMunicipality().subscribe((data: Lookup_Municipality[]) => {
            this.municipalities = data;
        });

        this.lookupService.getCenters().subscribe((data: Lookup_Center[]) => {
            this.centers = data;
            
        });
      }
    
      onCenterChange(selectedCenterId: string) {
        if (selectedCenterId) {
            this.lookupService.getLookupInterest(selectedCenterId).subscribe((data: any[]) => {
                this.interests = data.map(item => ({
                    value: item.id,
                    label: item.description
                }));
            });
        } else {
            this.interests = [];
        }
    }

    // Handles province change and loads towns based on the selected province
    onProvinceChange(selectedProvinceId: string) {
        if (selectedProvinceId) {
            this.lookupService.getLookupTownbyProvince(selectedProvinceId).subscribe((data: Lookup_Town_by_Province[]) => {
                this.towns = data.map(item => ({
                    value: item.id,
                    label: item.description
                }));
            });
        } else {
            this.towns = [];
        }
        // Reset selected town and centers when province changes
        this.selectedTown = null;
        this.centers = [];
    }

    // Handles town change and loads centers based on the selected town
    onTownChange(selectedTownId: string) {
        if (selectedTownId) {
            this.lookupService.getLookupCenterbyTown(selectedTownId).subscribe((data: Lookup_Center_by_Town[]) => {
                // Assuming `Lookup_Center_by_Town` and `Lookup_Center` are similar in structure
                this.centers = data.map(item => ({
                    id: item.id,               // Assign id to id
                    name: item.description,    // Use the description as the center's name
                    municipalityId: selectedTownId // Assuming the townId relates to municipalityId
                }));
            });
        } else {
            this.centers = [];
        }
    }
    

    onAddNew() {
        this.selectedTrainee = {
            personAddress: {},
            personInterest: {}
        };
        this.submitted = false;
        this.traineeDialog = true;
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    viewTrainee(trainee: Trainee) {
        
    
        this.selectedTrainee = { 
            ...trainee, 
        };
    
        this.traineeDialog = true;
    }
    
    
    
    

    editTrainee(trainee: Trainee) {
        this.selectedTrainee = { ...trainee };
        this.traineeDialog = true;
    }

    hideDialog() {
        this.traineeDialog = false;
        this.submitted = false;
    }
   
    
    

    saveTrainee() {
        this.submitted = true;
    
        if (this.selectedTrainee?.firstName && this.selectedTrainee.lastName) {
            
    
            // Format the date of birth
            const formattedDateOfBirth = this.selectedTrainee.dateOfBirth
                ? this.formatDate(this.selectedTrainee.dateOfBirth)
                : '';
    
            // Construct the payload for the trainee
            const traineePayload: Trainee = {
                ...this.selectedTrainee,
                dateOfBirth: formattedDateOfBirth || this.selectedTrainee.dateOfBirth,
            };

            console.log(traineePayload);
            
    
            // Check if it's an update or new save
            if (this.selectedTrainee.personId && this.selectedTrainee.personId > 0) {
                // Update the trainee
                this.traineeService.updateTrainee(traineePayload).subscribe(
                    (response) => {
                        this.reloadTable();  // Reload the table data after update
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Trainee updated successfully!' });
                        this.hideDialog();  // Close dialog after successful update
                    },
                    (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating trainee.' });
                    }
                );
            } else {
                // Save new trainee
                this.traineeService.SaveTrainee(traineePayload).subscribe(
                    (response) => {
                        this.reloadTable();  // Reload the table data after save
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Trainee created successfully!' });
                        this.hideDialog();  // Close dialog after successful save
                    },
                    (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error creating trainee.' });
                    }
                );
            }
        }
    }
    
    
    
    
    
    // Utility method to reload table data
    reloadTable(): void {
        if (this.selectedCenter) {
            // Use the selectedCenter value to reload the data
            this.loadTraineeData(this.selectedCenter, 0, 10, 'id', 'ASC');
        } else {
            // If selectedCenter is still null, fetch the latest center from the service
            this.centerSelectionService.selectedCenter$.subscribe((centerId: string | null) => {
                if (centerId) {
                    this.loadTraineeData(centerId, 0, 10, 'id', 'ASC');
                }
            });
        }
    }    
    
      // Confirmation dialog for saving a trainee
      confirmSave(event: Event) {
        const action = this.selectedTrainee.personId && this.selectedTrainee.personId > 0 ? 'update' : 'save';
    
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: `Are you sure you want to ${action} this trainee?`,
            header: `${action.charAt(0).toUpperCase() + action.slice(1)} Confirmation`,  // Capitalize first letter
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.saveTrainee();  // Call saveTrainee if confirmed
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: `${action.charAt(0).toUpperCase() + action.slice(1)} action cancelled` });
            }
        });
    }
    
      // Confirmation dialog for deleting a trainee
      confirmDelete(event: Event) {
        this.confirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Are you sure you want to delete this record?',
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          acceptButtonStyleClass: 'p-button-danger p-button-text',
          rejectButtonStyleClass: 'p-button-text',
          accept: () => {
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Record deleted' });
            // Call delete logic here
          },
          reject: () => {
            this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Delete action cancelled' });
          }
        });
      }
    
      // Utility method to format the date to YYYY-MM-DD
      formatDate(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

    
    
    
    
}