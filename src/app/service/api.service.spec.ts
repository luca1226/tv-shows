import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

fdescribe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: ApiService}
      ],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tvShowsList', () => {
    spyOn(ApiService.prototype, 'getAllTVShows').and.callThrough();
    service.getAllTVShows();
    expect( service.getAllTVShows).toHaveBeenCalled();
  });
  it('should get showDetails', () => {
    spyOn(ApiService.prototype, 'getShowDetails').and.callThrough();
    service.getShowDetails(1);
    expect(service.getShowDetails).toHaveBeenCalled();
  });
  it('should get searchShows', () => {
    spyOn(ApiService.prototype, 'searchShows').and.callThrough();
    service.searchShows('drama');
    expect(service.searchShows).toHaveBeenCalled();
  });
});
