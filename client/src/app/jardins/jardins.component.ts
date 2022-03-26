import { Component, OnInit } from '@angular/core';
import { Jardin } from '../../../../common/tables/Jardin';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-jardins',
  templateUrl: './jardins.component.html',
  styleUrls: ['./jardins.component.css']
})
export class JardinsComponent implements OnInit {
  jardins: Jardin[];
  displayedColumns: string[] = ['ID', 'nom'];

  constructor(private readonly communicationService: CommunicationService) {
  }

    public ngOnInit(): void {
      this.getJardins();
  }

  private getJardins() {
    this.communicationService.getJardins().subscribe((jardins: Jardin[]) => {
      this.jardins = jardins ? jardins : [];
    });
  }

  getJardins2() {
    this.getJardins();
    console.log(this.jardins);
  }
}
