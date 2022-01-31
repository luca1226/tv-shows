import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 
  }

  /**
   * This method fetches all the shows from tvmaze API
   * @returns 
   */
  getAllTVShows(): Observable<any> {
    return this.http.get(`${environment.backendURL}shows?page=1`);
  }

  /**
   * This method fetch results based on the input text provided
   * @param searchText - text that search the show
   * @returns 
   */
  searchShows(searchText: string): Observable<any> {
    return this.http.get(`${environment.backendURL}search/shows?q=${searchText}`);
  }

  /**
   * This method fetch details based on the show id provided.
   * @param id - id of the show 
   * @returns 
   */
  getShowDetails(id: number): Observable<any> {
    return this.http.get(`${environment.backendURL}shows/${id}`);
  }

  /**
   * This method fetch details based on the show id provided.
   * @param id - id of the show
   * @returns 
   */
  getShowCast(id: number): Observable<any> {
    return this.http.get(`${environment.backendURL}shows/${id}/cast`);
  }
}
