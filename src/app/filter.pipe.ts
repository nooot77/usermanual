import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(post: any, term: any): any {
    //cheak if search term is  undifind
    if(term === undefined) return post;
    //return updated post array
    return post.filter(function(search){
      return search.title.toLowerCase().includes(term.toLowerCase());
    })
  }

}
