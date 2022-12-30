import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { DataService } from './data.service';
// import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'abbrevations';
  data: any = {};
  result = '';
  searchSentence: string = '';
  buttonLabel: string = 'Abbrevations to Words';
  toWords = true;

  constructor(
    public dataService: DataService,
    private _clipboardService: ClipboardService
  ) {}
  async ngOnInit() {
    this.data = await this.dataService.getPAbbrevations();
  }
  search(sentence: any) {
    if (this.toWords) {
      this.getByAbbrevations(sentence, this.data);
    } else {
      const newData = this.swap(this.data);
      this.getByAbbrevations(sentence, newData);
    }
  }

  getByAbbrevations(sentence: string, data: any) {
    this.result = '';
    let shorts = sentence.trim().split(',');
    for (let i = 0; i < shorts.length; i++) {
      let item = shorts[i];
      this.result += data[item] ? data[item] + ' ' : shorts[i] + ' ';
    }
  }
  swap(json: any) {
    var ret: any = {};
    for (var key in json) {
      ret[json[key]] = key;
    }
    return ret;
  }
  delete() {
    this.result = '';
    this.searchSentence = '';
  }
  changeLabelName() {
    this.toWords = !this.toWords;
    this.buttonLabel = this.toWords
      ? 'Abbrevations to Words'
      : ' Words to Abbrevations';
  }

  copy() {
    this._clipboardService.copy(this.result);
  }
}
