import { Injectable } from '@angular/core';
import { SEASONS_URLS } from '../../constants/urls';
import { RequestService } from './request.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {
  constructor(private request: RequestService) {}

  /**
   * Take all seasons list list
   */
  list() {
    console.log(SEASONS_URLS.ALL_SEASONS_URL);
    return this.request
      .getQuery(SEASONS_URLS.ALL_SEASONS_URL)
      .pipe(map(data => data['MRData'].SeasonTable.Seasons));
  }

  /**
   * Load all sessions data from JSON File
   */
  loadListFromLocal() {
    return this.request
      .getJSON('./../../../assets/data/api/seasons.json')
      .pipe(map(data => data['MRData'].SeasonTable.Seasons));
  }
}
