import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ApiService } from '../service/api.service';
import { SearchListComponent } from './search-list.component';

const mockData = '[{"score":100,"show":{"id":1,"url": "http://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"Englosh","genres":["Drama","Science-Fiction", "Thriller"],"status":"Ended","runtime":60,"premiered": "2013-06-24","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"19:00","days":["Thursday"]},"rating":{"average":6.5},"weight":97,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b>  tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/1"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/185054"}}}}]';
describe('SearchListComponent', () => {
  let component: SearchListComponent;
  let fixture: ComponentFixture<SearchListComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'dashboard', component: DashboardComponent }
      ])],
      providers: [HttpClient, ApiService, {
        provide: ActivatedRoute, Router, useValue: {
          paramMap: of(convertToParamMap({ id: 1 }))
        }
      },{ provide: Router, useValue: router }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call API to get Search Shows', () => {
    spyOn(ApiService.prototype, 'searchShows').and.returnValue(of(JSON.parse(mockData)));
    component.getShowsBySearch('drama');
    spyOn(component.searchResults, 'sort');
    expect( component.searchResults.sort()).toEqual( component.searchResults.sort());
    expect(component.searchResults.length).toBeGreaterThan(0);
  }); 

  it('should show error when API call returns an error for Search Shows', () => {
    spyOn(ApiService.prototype, 'searchShows').and.returnValue(throwError('error'));
    component.searchVal = 'drama';
    component.getShowsBySearch(component.searchVal);
    expect(component.hasError).toBeTruthy();
  });

  it('should navigate to Dashboard Page when gotoDashboard is clicked', () => {
    component.goDashBoard();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  }); 

});

