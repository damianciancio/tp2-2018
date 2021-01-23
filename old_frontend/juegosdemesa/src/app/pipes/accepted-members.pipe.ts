import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acceptedMembers',
  pure: false
})
export class AcceptedMembersPipe implements PipeTransform {

  transform(items: any[], filter:String): any {
    if(!items || !filter){
      return items;
    }

    items = items.filter((item) => { return item.status == filter });
    console.log(items);
    return items;
  }

}
