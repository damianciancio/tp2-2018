import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router , ActivatedRoute} from '@angular/router';
import { BackendServiceService } from 'src/services/backendService/backend-service.service';
import { PlayerSearchComponent } from 'src/app/player-search/player-search.component';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  constructor(
    private back : BackendServiceService, 
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
  ) { }
  
  group = {
    name: ""
  }; 
  editing = false;
  ngOnInit() {
    var component = this;
    var idGroup = this.route.snapshot.params.id;

    if (idGroup) {
        this.editing = true;
          this.back.getOneGroup(idGroup).subscribe((group: any) => {
            component.group = group.group;
            component.title.setTitle("Editar " + component.group.name);
          });
      
    }

  }

  createGroup() {
    if (this.validateGroup()) {
      if (!this.editing) {
        var request = this.back.createGroup(this.group);
        request.subscribe((response:any) => {
          if (response._id) {
            this.router.navigateByUrl("/groups/" + response._id);
          }
        });
      } else {
        var request = this.back.editGroup(this.group);
        request.subscribe((response:any) => {
          if (response._id) {
            this.router.navigateByUrl("/groups/" + response._id);
          }
        });
      }
    }
  }

  validateGroup() {
    if (this.group.name.trim()) {
      return true;
    }
    return false;
  }

}
