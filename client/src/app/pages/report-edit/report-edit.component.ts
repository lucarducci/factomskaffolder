// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { ReportService } from '../../services/report.service';
import { PatientService } from '../../services/patient.service';
// Import Models
import { Report } from '../../domain/factomskaffolder_db/report';
import { Patient } from '../../domain/factomskaffolder_db/patient';

// START - USED SERVICES
/**
* ReportService.create
*	@description CRUD ACTION create
*
* ReportService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* PatientService.list
*	@description CRUD ACTION list
*
* ReportService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Report
 */
@Component({
    selector: 'app-report-edit',
    templateUrl: 'report-edit.component.html',
    styleUrls: ['report-edit.component.css']
})
export class ReportEditComponent implements OnInit {
    item: Report;
    listPatient: Patient[];
    model: Report;
    formValid: Boolean;

    constructor(
    private reportService: ReportService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Report();
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.reportService.get(id).subscribe(item => this.item = item);
            }
            // Get relations
            this.patientService.list().subscribe(list => this.listPatient = list);
        });
    }

    /**
     * Check if an Patient is in  patient
     *
     * @param {string} id Id of Patient to search
     * @returns {boolean} True if it is found
     */
    containPatient(id: string): boolean {
        if (!this.item.patient) return false;
        return this.item.patient.indexOf(id) !== -1;
    }

    /**
     * Add Patient from Report
     *
     * @param {string} id Id of Patient to add in this.item.patient array
     */
    addPatient(id: string) {
        if (!this.item.patient)
            this.item.patient = [];
        this.item.patient.push(id);
    }

    /**
     * Remove an Patient from a Report
     *
     * @param {number} index Index of Patient in this.item.patient array
     */
    removePatient(index: number) {
        this.item.patient.splice(index, 1);
    }

    /**
     * Save Report
     *
     * @param {boolean} formValid Form validity check
     * @param Report item Report to save
     */
    save(formValid: boolean, item: Report): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.reportService.update(item).subscribe(data => this.goBack());
            } else {
                this.reportService.create(item).subscribe(data => this.goBack());
            } 
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }


}



