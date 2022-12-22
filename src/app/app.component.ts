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
  showResult = false;
  searchSentence: string = '';
  constructor(public dataService: DataService,private _clipboardService: ClipboardService) {}
  async ngOnInit() {
    this.data = await this.dataService.getPAbbrevations();
  }
  // copyText(textToCopy: string) {
  //     this.clipboard.copy(textToCopy);
  // }
  search(sentence: any) {
    this.result = '';
    let shorts = sentence.trim().split(' ');
    for (let i = 0; i < shorts.length; i++) {
      let item = shorts[i];
      this.result += this.data[item] ? this.data[item] + ' ' : shorts[i]+' ';
    }
    this.showResult = true;
  }

  delete(inputVal: any) {
    this.result = '';
    this.showResult = false;
    this.searchSentence = '';
  }


  copyInputMessage(inputElement:any){
    // inputElement.select();
    // document.execCommand('copy');
    // inputElement.setSelectionRange(0, 0);
    
  }

  copy(){
    this._clipboardService.copy(this.result)
  }
  // copyToClipboard(item:any) {
  //   document.addEventListener('copy', (e: any) => {
  //     e.clipboardData.setData('text/plain', (item:any));
  //     e.preventDefault();
  //     document.removeEventListener('copy', null);
  //   });
  //   document.execCommand('copy');
  // }
}
