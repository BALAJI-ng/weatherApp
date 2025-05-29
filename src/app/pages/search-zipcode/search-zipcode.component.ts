
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
// Update the import path below to the correct relative path where weather.service.ts exists
import { WeatherService } from '../../service/weather.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-zipcode',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './search-zipcode.component.html',
  styleUrls: ['./search-zipcode.component.scss']
})
export class SearchZipcodeComponent implements OnInit, AfterViewInit {

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['countyName', 'image', 'currentCondition', 'temperature', 'maxToday', 'minToday', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private api: WeatherService, private route: ActivatedRoute, private router: Router) { }
  //used in HTML
  zipcode: string | undefined;
  weatherdetailsbyzip: WeatherCondition[] = [];
  county: string | undefined;
  current_condition: string | undefined;
  Temperature: number | undefined;
  maxtoday: number | undefined;
  mintoday: number | undefined;
  today: number = Date.now();
  @ViewChildren('currentdiv') currentdiv: QueryList<ElementRef> | undefined;
  itemImageUrl = '../assets/snow.png'
  ngOnInit(): void {
    //start -- navigation from forecast to main page check for local storage
    if (typeof window !== 'undefined' && window.localStorage) {
      var savedzipcodes = localStorage.getItem('zipcode');
      if (savedzipcodes) {
        let zipCodes: string[] = (savedzipcodes ?? '').split(',');
        this.weatherdetailsbyzip = [];
        for (let i: number = 0; i < zipCodes.length; i++) {
          this.getlocation(zipCodes[i]);
        }
      } else {
        let savedzipcode: string = "";
        localStorage.setItem('zipcode', savedzipcode);
      }
    }
  }

  //end -- navigation from forecast to main page check for local storage
  deletediv(i: number) {
    this.weatherdetailsbyzip.splice(i, 1);
    let zipCodes: string = "";
    for (let i: number = 0; i < this.weatherdetailsbyzip.length; i++) {
      if (i == 0)
        zipCodes = zipCodes + this.weatherdetailsbyzip[i].zipCode;
      else
        zipCodes = zipCodes + "," + this.weatherdetailsbyzip[i].zipCode;
    }
    localStorage.setItem('zipcode', zipCodes);
  }


  Forecast_zipcode(i: string) {
    this.router.navigate(['/forecast/' + i]);
  }

  add_location() {
    var savedzipcodes = localStorage.getItem('zipcode');
    if (savedzipcodes == "") {
      savedzipcodes = (document.getElementById("zipcode") as HTMLInputElement).value;
    }
    else {
      savedzipcodes = savedzipcodes + "," + (document.getElementById("zipcode") as HTMLInputElement).value;
    }
    localStorage.setItem('zipcode', savedzipcodes);
    let zipCodes: string[] = savedzipcodes.split(',');
    this.weatherdetailsbyzip = [];
    for (let i: number = 0; i < zipCodes.length; i++) {
      this.getlocation(zipCodes[i]);
    }

    this.zipcode = '';
    this.updateTable();
  }
  updateTable() {
    this.dataSource.data = this.weatherdetailsbyzip;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  getlocation(id: string) {
    this.api.getlocation(id)
      .subscribe((data: any) => {
        let weatherCondition: WeatherCondition = new WeatherCondition();

        console.log(data.weather[0].main)
        weatherCondition.zipCode = id;
        console.log(weatherCondition.zipCode)
        weatherCondition.logo = data.weather[0].main;
        weatherCondition.countyName = data.name;
        weatherCondition.currentCondition = data.weather[0].description;
        weatherCondition.temperature = data.main.temp;
        weatherCondition.maxToday = data.main.temp_max;
        weatherCondition.minToday = data.main.temp_min;
        // if (weatherCondition.logo == 'Clouds')
        //   weatherCondition.imgSrc = '/assets/clouds.png';     
        // else if (weatherCondition.logo == 'Rain')
        //   weatherCondition.imgSrc = '/assets/rain.png';
        // else if (weatherCondition.logo == 'Snow')
        //   weatherCondition.imgSrc = '/assets/snow.png';
        //    else if (weatherCondition.logo == 'Clear')
        //   weatherCondition.imgSrc = '/assets/sun.png';
        //     else if (weatherCondition.logo == 'haze')
        //   weatherCondition.imgSrc = '/assets/sun.png';



        this.weatherdetailsbyzip.push(weatherCondition);
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

