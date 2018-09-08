import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DriversService } from '../../services/api/drivers.service';
import { Driver } from '../../interfaces/driver.interface';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  selectYear: string;
  driversList: Driver[];
  showInfo: boolean;
  constructor(
    private selectPageService: SharedService,
    private _driversService: DriversService,
    private _alertService: AlertService
  ) {}

  ngOnInit() {
    this.showInfo = false;
    this.selectPageService.setSelectPage('drivers');
    this.selectYearDrivers();
  }

  selectYearDrivers(year: string = String(new Date().getFullYear())) {
    this.selectYear = year;
    this._alertService.loadData(
      `Load ${this.selectYear} season drivers!!`,
      'Wait a moment please!!'
    );
    this._driversService.listByYear(year).subscribe(
      (data: Driver[]) => {
        this.selectPageService.setSelectPage(
          `Drivers List to  ${this.selectYear} season`
        );
        this.driversList = data;
        console.log(this.driversList);
        this.showInfo = true;
        this._alertService.closeAlert();
      },
      errorService => {}
    );
  }
}
