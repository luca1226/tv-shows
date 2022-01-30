import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SearchListComponent } from '../search-list/search-list.component';
import { ApiService } from '../service/api.service';
import { ShowDetailsComponent } from './show-details.component';

const mockData = '{"id":1,"url": "http://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"Englosh","genres":["Drama","Science-Fiction", "Thriller"],"status":"Ended","runtime":60,"premiered": "2013-06-24","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"19:00","days":["Thursday"]},"rating":{"average":6.5},"weight":97,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b>  tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/1"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/185054"}}}';

describe('ShowDetailsComponent', () => {
  let component: ShowDetailsComponent;
  let fixture: ComponentFixture<ShowDetailsComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ShowDetailsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'dashboard', component: DashboardComponent },
        { path: 'searchList', component: SearchListComponent,pathMatch: 'full'}
      ])],
      providers: [ApiService, HttpClient, {
        provide: ActivatedRoute, Router, useValue: {
          paramMap: of(convertToParamMap({ id: 1 }))
        }
      },{ provide: Router, useValue: router }]
    })
      .compileComponents();
      
  }));

  beforeEach(() => {
  fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should call search list page if search value is present in local storage method', () => {
    expect(localStorage.setItem('searchValue', 'drama'));
    component.goHome();
    component.backButtonText = "Back to Search Result";
    expect(router.navigate).toHaveBeenCalledWith(['/searchList']);
  });

  it('should call dash board page if search value is present in local storage method', () => {
    expect(localStorage.setItem('searchValue', ''));
    component.goHome();
    component.backButtonText = "Go Dashboard";
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
  
  it('should call API to get Show details', () => {
    spyOn(ApiService.prototype, 'getShowDetails').and.returnValue(of(JSON.parse(mockData)));
    component.ngOnInit();
    expect(typeof (component.showDetails)).toBe('object');
  });

  it('should show error when API call returns an error for getShowDetails', () => {
    spyOn(ApiService.prototype, 'getShowDetails').and.returnValue(throwError('error'));
    component.ngOnInit();
    expect(component.hasError).toBeTruthy();
  });
});
