import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ShowListComponent } from './show-list.component';

const testData = '[{"score":100,"show":{"id":1,"url": "http://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"Englosh","genres":["Drama","Science-Fiction", "Thriller"],"status":"Ended","runtime":60,"premiered": "2013-06-24","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"19:00","days":["Thursday"]},"rating":{"average":6.5},"weight":97,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b>  tells Africa\'s story (Elisabet Casanovas), a 20-year-old who lives in a shared apartment that is falling apart, has a precarious job and sees how her life changes radically when she discovers she got pregnant and does not know by whom.</p>","updated":1583514689,"_links":{"self":{"href":"http://api.tvmaze.com/shows/1"},"previousepisode":{"href":"http://api.tvmaze.com/episodes/185054"}}}}]';

describe('ShowListComponent', () => {
  let component: ShowListComponent;
  let fixture: ComponentFixture<ShowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowListComponent ],
      imports: [RouterTestingModule, IvyCarouselModule],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.searchResults = [];
    component.genresType = '';
    component.showsDataByGenres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save data received from parent genresType to be saved in genre variable', () => {
    component.ngOnChanges({
      genresType: new SimpleChange(null, 'Drama', false)
    });
    expect(component.genre).toEqual('Drama');
  });

  it('should save data received from parent searchResults to be saved in showsDataByGenres variable', () => {
    component.ngOnChanges({
      searchResults: new SimpleChange(null, JSON.parse(testData), false)
    });
    expect(component.showsDataByGenres.length).toBeGreaterThanOrEqual(0);
  });
});
