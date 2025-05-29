import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
// Update the path below if your weather.service.ts is in a different folder
import { WeatherService } from '../../service/weather.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { CommonModule, DatePipe, Location } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-future-forecast',
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './future-forecast.component.html',
  styleUrl: './future-forecast.component.scss',
  providers: [DatePipe]
})
export class FutureForecastComponent implements OnInit {
  displayedColumns: string[] = ['day', 'condition', 'icon'];
  day: string[] = [];
  day2: string | undefined;
  day3: string | undefined;
  day4: string | undefined;
  day5: string | undefined;
  dateStr: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  constructor(private api: WeatherService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, private _location: Location) {
    let today = new Date();

    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      this.day[i] = this.datePipe.transform(date, 'EEEE') ?? '';
      this.dateStr[i] = this.datePipe.transform(date, 'MM/dd') ?? '';
    }

    // this.day[0] = datePipe.transform(today, 'EEEE') ?? '';
    // this.day[1] = datePipe.transform(today.setDate(today.getDate() + 1), 'EEEE') ?? '';
    // this.day[2] = datePipe.transform(today.setDate(today.getDate() + 1), 'EEEE') ?? '';
    // this.day[3] = datePipe.transform(today.setDate(today.getDate() + 1), 'EEEE') ?? '';
    // this.day[4] = datePipe.transform(today.setDate(today.getDate() + 1), 'EEEE') ?? '';


  }



  //used in HTML
  zipcode: string | undefined;
  weatherdetailsbyzip: WeatherCondition[] = [];
  county: string | undefined;
  current_condition: string | undefined;
  Temperature: number | undefined;
  maxtoday: number | undefined;
  mintoday: number | undefined
  forecastzipcode: string | undefined

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.forecastzipcode = params.get('forecastzipcode') ?? '';
      if (this.forecastzipcode) {
        this.getdailyforecast(this.forecastzipcode);
      }
    });


  }

  // go_back()
  // {
  //   this._location.back();
  // }

  getdailyforecast(id: string) {



    this.api.getdailyforecast(id)
      .subscribe((data: any) => {






        for (let i: number = 1; i < 6; i++) {
          let weatherCondition: WeatherCondition = new WeatherCondition();
          weatherCondition.zipCode = id;
          weatherCondition.countyName = data.city.name;
          weatherCondition.logo = data.list[i].weather[0].main;
          weatherCondition.currentCondition = data.list[i].weather[0].description;
          weatherCondition.maxToday = data.list[i].temp.max;
          weatherCondition.minToday = data.list[i].temp.min;



          if (weatherCondition.logo == 'Clouds')
            weatherCondition.imgSrc = '/assets/clouds.png';
          else if (weatherCondition.logo == 'Clear')
            weatherCondition.imgSrc = '/assets/sun.png';
          else if (weatherCondition.logo == 'Clear')
            weatherCondition.imgSrc = '/assets/sun.png';
          else if (weatherCondition.logo == 'Rain')
            weatherCondition.imgSrc = '/assets/rain.png';
          else if (weatherCondition.logo == 'Snow')
            weatherCondition.imgSrc = '/assets/snow.png';

          this.weatherdetailsbyzip.push(weatherCondition);









        }

        this.dataSource.data = this.weatherdetailsbyzip;




      });



  }



}

export class WeatherCondition {
  zipCode: string | undefined;
  logo: string | undefined;
  countyName: string | undefined;
  currentCondition: string | undefined;
  temperature: number | undefined;
  maxToday: number | undefined;
  minToday: number | undefined;
  imgSrc: string | undefined;
}
