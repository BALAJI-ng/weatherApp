import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { ActivatedRoute, Router } from '@angular/router'
import { CommonModule, DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-forecast',
  imports: [CommonModule],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
  providers: [DatePipe]

})
export class ForecastComponent implements OnInit {

  day: string[] = [];
  day2: string | undefined;
  day3: string | undefined;
  day4: string | undefined;
  day5: string | undefined;

  constructor(private api: WeatherService, private route: ActivatedRoute, private router: Router, private datePipe: DatePipe, private _location: Location) {

    let today = new Date(Date.now());
    this.day[0] = datePipe.transform(today, 'EEEE') ?? '';
    this.day[1] = datePipe.transform(today.setDate(today.getDate() + 1), 'EEEE') ?? '';
    this.day[2] = datePipe.transform(today.setDate(today.getDate() + 1), 'EEEE') ?? '';
    this.day[3] = datePipe.transform(today.setDate(today.getDate() + 1), 'EEEE') ?? '';
    this.day[4] = datePipe.transform(today.setDate(today.getDate() + 1), 'EEEE') ?? '';


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

    var a = this.route.paramMap.subscribe(params => {
      this.forecastzipcode = params.get('forecastzipcode') ?? '';
    });
    if (this.forecastzipcode) {
      this.getdailyforecast(this.forecastzipcode);
    }


  }

  // go_back()
  // {
  //   this._location.back();
  // }

  getdailyforecast(id: string) {



    this.api.getdailyforecast(id)
      .subscribe((data: any) => {
        setTimeout(() => { // Simulate delay (e.g., 500ms)





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



        }, 3000); // 500ms delay


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