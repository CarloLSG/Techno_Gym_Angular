import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Participant} from "../../model/participant";
import {Center} from "../../model/center";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ParticipantsService} from "../../services/participants.service";
import {CentersService} from "../../services/centers.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit, AfterViewInit{
  dataSource = new MatTableDataSource<Participant>();
  displayedColumns: string[] = ['participantId', 'firstName', 'lastName', 'marathonCenterName', 'ranking', 'recordTime'];

  centers: Center[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private participantService: ParticipantsService, private centersService: CentersService) {
  }

  getAllRecords() {
    this.participantService.getAll().subscribe((response: any) =>{
      this.dataSource.data = this.getBestRecordForEachCenter(response);
    });
  }

  getCenters(){
    this.centersService.getAll().subscribe((response: any) =>{
      this.centers = response;
    });
  }

  getCenterName(centerId: number): string {
    const center = this.centers.find((c) => c.id === centerId);
    return center ? center.name : '';
  }
  ngOnInit() {
    this.getAllRecords();
    this.getCenters()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getBestRecordForEachCenter(participants: Participant[]): Participant[] {
    const bestRecordsMap = new Map<number, Participant>();

    participants.forEach((participant) => {
      const centerId = participant.centerId;
      if (!bestRecordsMap.has(centerId)) {
        bestRecordsMap.set(centerId, participant);
      } else {
        const currentBest = bestRecordsMap.get(centerId);
        if (currentBest && participant.recordTime < currentBest.recordTime) {
          bestRecordsMap.set(centerId, participant);
        }
      }
    });

    return Array.from(bestRecordsMap.values());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
