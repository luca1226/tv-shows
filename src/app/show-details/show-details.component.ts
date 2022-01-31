import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shows } from '../models/show';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {
  id: any;
  showDetails!: Shows;
  castDetails!:any;
  hasError = false;
  isLoading = false;
  searchValue!: string;
  backButtonText!:string;
  constructor(
    private route: ActivatedRoute, private router: Router,
    private apiService: ApiService
  ) { }

/**
 * This method gets id from params and call API to get Show details and handling the back button Text.
 */
ngOnInit(): void {
    if(localStorage.getItem("searchValue")?.length){
      this.backButtonText = "Back to Search Result";
    }else{
      this.backButtonText = "Go Dashboard";
    }
    this.searchDetails();
    this.getCastDetails(); 
}
/**
 * This method fetches the details of selected show from service.
 */
searchDetails(){
  this.route.paramMap.subscribe(params => {
    this.id = params.get('id');
  });
  this.isLoading = true;
  this.apiService.getShowDetails(this.id).subscribe(
    (data) => {
      this.showDetails = data;
      this.hasError = false;
    },
    (error) => {
      this.hasError = true;
      this.isLoading = false;
    },
    () => {
      this.isLoading = false;
    }
  );
}

  /**
   * This method redirected to either Search List page or dashboard page
   */
  goHome() {
    if(localStorage.getItem("searchValue")?.length){
      this.router.navigate(['/searchList']);
    }else{
      this.router.navigate(['/dashboard']);
    }
  }

    /**
     * This method fetches the Cast Details of selected show from service.
     */
    getCastDetails(){
      this.apiService.getShowCast(this.id).subscribe(
        (data) => {
          this.castDetails = data;
          this.hasError = false;
        },
        (error) => {
          this.hasError = true;
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        }
      );
    }

}
