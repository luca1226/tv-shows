import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  public searchVal!: any;
  searchResults: any = [];
  isLoadingIndicator: boolean = false;
  hasError: boolean = false;
  
  constructor(private searchShowsService: ApiService, private router: Router) { }

  /**
   * This method fetches TV shows based on Search Value from Service.
   */
  ngOnInit(): void {
      if(localStorage.getItem("searchValue")?.length){
        this.searchVal = localStorage.getItem("searchValue");
        this.getShowsBySearch(localStorage.getItem("searchValue"));
      }
  }

  /**
   * This function fetches all the shows from tvmaze API based on Search input.
   * @param searchVal - value searched by the user
   */
  getShowsBySearch(searchVal : any) {
    this.isLoadingIndicator = true;
    this.searchShowsService.searchShows(searchVal).subscribe(
      (data: any) => {
        this.searchResults = data.map((item: { show: any; }) => item.show);
        this.searchResults.sort((a: { rating: { average: number; }; }, b: { rating: { average: number; }; }) => a.rating.average > b.rating.average ? -1 : 1);
        this.hasError = false;
      },
      (error) => {
        this.hasError = true;
      },
      () => {
        this.isLoadingIndicator = false;
      }
    );
  }

  /**
   * This method is used to redirect the user to the Dashboard
   */
  goDashBoard() {
    this.router.navigate(['/dashboard']);
  }

}
