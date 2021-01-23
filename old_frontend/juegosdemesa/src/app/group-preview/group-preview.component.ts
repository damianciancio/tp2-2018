import { Component, OnInit, Input } from '@angular/core';
import { BackendServiceService } from '../../services/backendService/backend-service.service';

@Component({
  selector: 'app-group-preview',
  templateUrl: './group-preview.component.html',
  styleUrls: ['./group-preview.component.css']
})
export class GroupPreviewComponent implements OnInit {
  @Input() group: any;
  constructor(private back: BackendServiceService) { }

  ngOnInit() {
    console.log(this.group);
    console.log(this.back.isCurrentPlayerAdmin(this.group));
  }

  getGroupDetailsLink() {
    return "";
  }

}
