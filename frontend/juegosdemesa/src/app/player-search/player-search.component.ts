import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() searchText:String = "";

  ngOnInit() {
  }


  ngOnChanges(changes: any) {
    console.log(changes);
  }


}
