import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { CenterSelectionService } from 'src/app/center-selection.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ApplicationCount, EducationLevel, GenderGroup, Interests, PersonAgeGroup } from 'src/app/modules/api/dashboard';
import { DashboardService } from 'src/app/modules/service/dashboard.service';

@Component({
    templateUrl: './saas.dashboard.component.html',
    styles: [`
        .d-flex {
            display: flex;
        }

        .w-50 {
            width: 50%;
        }

        .divider {
            padding: 0 10px;
            display: flex;
            align-items: center;
        }

        .list-none {
            list-style-type: none;
            margin: 0;
            padding: 0;
        }

        .mb-4 {
            margin-bottom: 1rem;
        }

        .font-bold {
            font-weight: bold;
        }

        .flex {
            display: flex;
        }

        .align-items-center {
            align-items: center;
        }

        .justify-content-between {
            justify-content: space-between;
        }

        .border-round {
            border-radius: 0.5rem;
        }

        .overflow-hidden {
            overflow: hidden;
        }

        .surface-200 {
            background-color: #f1f3f5; /* Adjust this to match your theme */
        }

        .h-full {
            height: 100%;
        }

        .mx-2 {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
        }
    `]
})
export class SaaSDashboardComponent implements OnInit, OnDestroy {

    overviewChartDataByAge: any;
    overviewChartDataByEducation: any;
    overviewChartOptions: any;
    selectedOverviewWeek: any ;
    revenueChartData: any;
    revenueChartOptions: any;
    subscription: Subscription;
    revenueChart: any;
    revenueOptions: any;
    applicationCount: ApplicationCount = {
        totalApplicationCount: 0,
        totalApplicationCountForDay: 0
    };

    ageGroup: PersonAgeGroup[] =[];
    labelsListAge: string[] = [];
    dataListAge: number[] = [];

    educationGroup: EducationLevel[] =[];
    labelsListEducation: string[] = [];
    dataListEducation: number[] = [];

    genderGroups: GenderGroup[] = [];
    labelsListGender: string[] = [];
    dataListGender: number[] = [];

    interests: Interests[] = [];
    totalPersonCount: number = 0;
    interestPercentages: { interest: string, percentage: number, color: string }[] = [];
    firstColumn: { interest: string, percentage: number, color: string }[] = [];
    secondColumn: { interest: string, percentage: number, color: string }[] = [];

    selectedCenter: string | null = null;

    constructor(public layoutService: LayoutService, private dashboardService: DashboardService,
        private centerSelectionService: CenterSelectionService
    ) { 
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initCharts();
        });
    }

    ngOnInit() {

        // Subscribe to the selected center observable
        this.centerSelectionService.selectedCenter$.subscribe(
            (centerId: string | null) => {
                if (centerId) {
                    this.loadDataForCenter(centerId); 
                }
            }
        );
    }
    
    loadDataForCenter(centerId: string): void {
    
        // Fetch registered applicant count for the selected center
        this.dashboardService.getRegisteredApplicantCount(centerId).subscribe((ApplicationCountData: ApplicationCount) => {
            this.applicationCount = ApplicationCountData;
        });
    
        // Fetch registered age group count for the selected center
        this.dashboardService.getRegisteredByAgeGroupCount(centerId).subscribe((ApplicantAgeCountData: PersonAgeGroup[]) => {
            this.ageGroup = ApplicantAgeCountData;
    
            // Populate labels and data lists after ageGroup is populated
            this.labelsListAge = [];
            this.dataListAge = [];
            this.ageGroup.forEach(group => {
                this.labelsListAge.push(group.ageGroup);
                this.dataListAge.push(group.personCount);
            });
    
            // Initialize charts with the updated data
            this.initCharts();
        });
    
        // Fetch registered education level count for the selected center
        this.dashboardService.getRegisteredByEduLevelCount(centerId).subscribe((ApplicantEduLevelCountData: EducationLevel[]) => {
            this.educationGroup = ApplicantEduLevelCountData;
    
            // Populate labels and data lists after educationGroup is populated
            this.labelsListEducation = [];
            this.dataListEducation = [];
            this.educationGroup.forEach(group => {
                this.labelsListEducation.push(group.educationLevel);
                this.dataListEducation.push(group.personCount);
            });
    
            // Initialize charts with the updated data
            this.initCharts();
        });
    
        // Fetch registered gender group count for the selected center
        this.dashboardService.getRegisteredByGenderGroupCount(centerId).subscribe((genderData: GenderGroup[]) => {
            this.genderGroups = genderData;
    
            // Populate labels and data lists for the doughnut chart
            this.labelsListGender = [];
            this.dataListGender = [];
            this.genderGroups.forEach(group => {
                this.labelsListGender.push(group.gender);
                this.dataListGender.push(group.personCount);
            });
    
            // Initialize charts with the updated data
            this.initCharts();
        });
    
        // Fetch registered interest count for the selected center
        this.dashboardService.getRegisteredByInterestCount(centerId).subscribe((data: Interests[]) => {
            this.interests = data;
            this.calculatePercentages();
            this.splitColumns();
        });
    }
    

    jobDescriptions: { [key: string]: string } = {
        'BTP001': 'Construction professions',
        'HOTEL1': 'Hotel industry',
        'SOU001': 'Welding',
        'CHAU01': 'Professional drivers (trucks and heavy machinery)',
        'AVHOT1': 'Aviation: Training of flight attendants and stewards',
        'COUT01': 'Cutting and sewing',
        'ICT001': 'Computer science and new information and communication technologies',
        'MENU01': 'Carpentry',
        'ECO001': 'Eco-guard',
        'FOR001': 'Forestry',
        'ADM001': 'Administration (Executive Secretariat, logistics management, etc.)',
        'AGRO01': 'Agro-silvo-pastoral',
        'ELE001': 'Electricity and electronics',
        'CLIM01': 'Cold and air conditioning'
    };
    

    calculatePercentages(): void {
        this.totalPersonCount = this.interests.reduce((sum, item) => sum + item.personCount, 0);
        const colors = ['bg-orange-500', 'bg-indigo-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-teal-500'];

        this.interestPercentages = this.interests.map((item, index) => {
            const percentage = this.totalPersonCount > 0 ? (item.personCount / this.totalPersonCount) * 100 : 0;
            return {
                interest: item.interest,
                percentage: percentage,
                color: colors[index % colors.length]
            };
        });
    }

    splitColumns(): void {
        const midPoint = Math.ceil(this.interestPercentages.length / 2);
        this.firstColumn = this.interestPercentages.slice(0, midPoint);
        this.secondColumn = this.interestPercentages.slice(midPoint);
    }

    getGenderColor(gender: string): string {
        const documentStyle = getComputedStyle(document.documentElement);
        return gender === 'Male' 
            ? documentStyle.getPropertyValue('--indigo-500')
            : documentStyle.getPropertyValue('--purple-500');
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const primaryColor = documentStyle.getPropertyValue('--primary-color');
        const primaryColor300 = documentStyle.getPropertyValue('--primary-200');
        const borderColor = documentStyle.getPropertyValue('--surface-border');

        

       

        this.overviewChartDataByAge = {
            labels: this.labelsListAge,
            datasets: [
                
                {
                    label: 'Applicants',
                    data: this.dataListAge,
                    backgroundColor: [this.layoutService.config().colorScheme === 'dark' ? '#879AAF' : '#E4E7EB'] ,
                    hoverBackgroundColor: [primaryColor300],
                    fill: true,
                    borderRadius: 10,
                    borderSkipped: 'top bottom',
                    barPercentage: 0.3
                }
            ]
        };

        this.overviewChartDataByEducation = {
            labels: this.labelsListEducation,
            datasets: [
                
                {
                    label: 'Applicants',
                    data: this.dataListEducation,
                    backgroundColor: [this.layoutService.config().colorScheme === 'dark' ? '#879AAF' : '#E4E7EB'] ,
                    hoverBackgroundColor: [primaryColor300],
                    fill: true,
                    borderRadius: 10,
                    borderSkipped: 'top bottom',
                    barPercentage: 0.3
                }
            ]
        };
        

        this.overviewChartOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                    align: 'end',
                    labels: {
                        color: textColorSecondary
                    }
                }
            },
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                y: {
                    max: 7,
                    min: 0,
                    ticks: {
                        stepSize: 0,
                        callback: function(value: number, index: number) {
                            if (index === 0) {
                                return value;
                            }
                            else {
                                return value ;
                            }
                        },
                        color: textColorSecondary
                    },
                    grid: {
                        borderDash: [2, 2],
                        color: borderColor,
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        color: textColorSecondary
                    }
                }
            }
        };

        this.revenueChartData = {
            labels: this.labelsListGender,
            datasets: [
                {
                    data: this.dataListGender,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--indigo-500')
                    ],
                    borderWidth: 0
                }
            ]
        };

        this.revenueChartOptions = {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: textColorSecondary
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            cutout: '50%',  // Adjusts the size of the doughnut hole
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
            }
        };
    }


    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
