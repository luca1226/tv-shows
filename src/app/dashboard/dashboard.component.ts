import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shows } from '../models/show';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  searchData = '';
  allShowsData: Shows[] = [];
  dramaData:  Shows[] = [];
  sportsData: Shows[] = [];
  comedyData: Shows[] = [];
  actionData: Shows[] = [];
  isLoadingIndicator: boolean = false;
  hasError: boolean = false;

  constructor(private apiService: ApiService,private router: Router) { }

  ngOnInit(): void {
    localStorage.setItem("searchValue", '');
    this.getAllShows();
  }

  /**
   * This function filter the TV Shows Data based on genres.
   * @param genre - genre to be filtered
   * @returns 
   */
  filterDataByGenre(genre: string): Shows[] {
    return this.allShowsData.filter(item => item.genres.indexOf(genre) >= 0);
  }

  /**
   * This function fetches all the shows from tvmaze API and split data based on genre.
   */
  getAllShows() {
    this.isLoadingIndicator = true;
    this.apiService.getAllTVShows().subscribe(
      (data: Shows[]) => {
        this.allShowsData = data;
        this.allShowsData.sort((a, b) => a.rating.average > b.rating.average ? -1 : 1);
        this.dramaData = this.filterDataByGenre('Drama');
        this.comedyData = this.filterDataByGenre('Comedy');
        this.sportsData = this.filterDataByGenre('Sports');
        this.actionData = this.filterDataByGenre('Action');
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
   * This function search a show.
   * @param searchData - data that we need to search.
   */
  goToSearch(searchData: string) {
   localStorage.setItem("searchValue", searchData);
   this.router.navigate(['/searchList']);
  }

}
