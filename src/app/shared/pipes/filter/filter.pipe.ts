import { inject, Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { IMovie } from '../../models/movie.interface';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(data:IMovie[]|null,category:string,searchStr:string) {
    let returnVal:IMovie[] = [];
    switch (category) {
      case 'all':
        returnVal = data?.filter((item) => item.title.toLowerCase().includes(searchStr.toLowerCase())) || [];
        console.log(returnVal, searchStr);
        break;
        
        case 'Bookmarked':
          returnVal = data?.filter((item) => item.isBookmarked && item.title.toLowerCase().includes(searchStr.toLowerCase())) || [];
          console.log(returnVal, searchStr);
        break;
        
      default:
        returnVal = data?.filter((item) => item.category ===category && item.title.toLowerCase().includes(searchStr.toLowerCase())) || [];
        console.log(returnVal, searchStr);
        break;
    }
    return returnVal;
  }
}
