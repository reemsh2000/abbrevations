import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'abbrevations';
  data: any = {};
  result = '';
  showResult = false;

  constructor(public dataService: DataService) {}
  async ngOnInit() {
    this.data = await this.dataService.getPAbbrevations();
  }

  search(sentence: any) {
    this.result=""
    let shorts = sentence.trim().split(' ');
    for (let i = 0; i < shorts.length; i++) {
      let item = shorts[i];
      this.result += this.data[item] ? this.data[item] + ' ' : shorts[i];
    }
    this.showResult = true;
  }
}
