import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Shows } from '../models/show';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnChanges {

  @Input() searchResults: Shows[] = []
  @Input() genresType!: string;
  showsDataByGenres: Shows[] = []
  genre!: string;
  isLoadingIndicator = false;
  hasError = false;

  /**
   * This method receive input params from parent and store in assigned variables.
   * @param changes - changes that has been made.
   */
  ngOnChanges(changes: any) {
     if (changes.genresType) {
      this.genre = changes.genresType.currentValue;
    } 
    if (changes.searchResults) {
      this.showsDataByGenres = changes.searchResults.currentValue ? changes.searchResults.currentValue : [];
    }
  }

}
