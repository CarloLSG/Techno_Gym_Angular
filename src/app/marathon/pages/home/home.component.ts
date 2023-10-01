import {Component, OnInit} from '@angular/core';
import {Participant} from "../../model/participant";
import {ParticipantsService} from "../../services/participants.service";
import {Center} from "../../model/center";
import {CentersService} from "../../services/centers.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  participant: Participant = {} as Participant;
  centerName: Center = {} as Center;
  constructor(private participantService: ParticipantsService, private centersService: CentersService) {
  }


  private getParticipant(): void {
    this.participantService.getList().subscribe(participants => {
      const topParticipant = participants.find(p => p.ranking === 1);
      if (topParticipant) {
        this.participant = topParticipant;
      }
    });
  }

  getMarathonCenter(): void{
    this.getParticipant();
    this.centersService.getList().subscribe(centers => {
      const marathonCenter = centers.find(c => c.id === this.participant.centerId);
      if (marathonCenter) {
        this.centerName = marathonCenter;
      }
    });
  }

  formatRecordTime(record: Participant): string {
    const time = new Date(record.recordTime);
    const hours = time.getUTCHours().toString().padStart(2, '0');
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  ngOnInit(): void {
    this.getMarathonCenter();
  }
}
