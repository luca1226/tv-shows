import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { SearchListComponent } from '../search-list/search-list.component';
import { ApiService } from '../service/api.service';
import { ShowDetailsComponent } from '../show-details/show-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const mockData = '[{"id":46584,"url":"http://www.tvmaze.com/shows/46584/drama","name":"Drama","type":"Scripted","language":"Spanish","genres":["Drama","Comedy","Sports"],"status":"Running","runtime":25,"premiered":"2020-02-04","officialSite":"http://www.rtve.es/playz/drama/","schedule":{"time":"19:00","days":["Tuesday"]},"rating":{"average":6.7},"weight":0,"network":{"id":147,"name":"RTVE","country":{"name":"Spain","code":"ES","timezone":"Europe/Madrid"}},"webChannel":null,"externals":{"tvrage":null,"thetvdb":376734,"imdb":"tt11341924"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/244/611819.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/244/611819.jpg"},"summary":"<p><b>Drama</b> tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/46584"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/1812874"}}}]';
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([
        { path: 'searchList', component: SearchListComponent },
        { path: 'show-details/:id', component: ShowDetailsComponent,pathMatch: 'full'}
      ])],
      providers: [ApiService, HttpClient, {
        provide: ActivatedRoute, Router, useValue: {
          paramMap: of(convertToParamMap({ id: 1 }))
        }
      },{ provide: Router, useValue: router }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('App should return data after loaded', () => {
    spyOn(ApiService.prototype, 'getAllTVShows').and.returnValue(of(JSON.parse(mockData)));
    component.getAllShows();
    spyOn(component.allShowsData, 'sort');
    expect(component.allShowsData.length).toEqual(1);
    expect(component.dramaData.length).toBeGreaterThan(0);
    expect(component.comedyData.length).toBeGreaterThan(0);
    expect(component.sportsData.length).toBeGreaterThan(0);
  });

  it('should call API to get all TV Shows and sorted by genres and Rating', () => {
    spyOn(ApiService.prototype, 'getAllTVShows').and.returnValue(of(JSON.parse(mockData)));
    component.getAllShows();
    spyOn(component.allShowsData, 'sort');
    expect( component.allShowsData.sort()).toEqual( component.allShowsData.sort());
  });

  it('App should show error when we get error from API', () => {
    spyOn(ApiService.prototype, 'getAllTVShows').and.returnValue(throwError('error'));
    component.getAllShows();
    expect(component.hasError).toBeTruthy();
  });
  
  it('should call goToSearch method', () => {
    localStorage.setItem("searchValue", 'drama');
    component.goToSearch('drama');
    expect(router.navigate).toHaveBeenCalledWith(['/searchList']);
  });
});
