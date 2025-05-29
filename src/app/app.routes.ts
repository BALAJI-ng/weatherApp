import { Routes } from '@angular/router';
import { EnterZipcodeComponent } from './enter-zipcode/enter-zipcode.component';
import { ForecastComponent } from './forecast/forecast.component';
import { SearchZipcodeComponent } from './pages/search-zipcode/search-zipcode.component';
import { FutureForecastComponent } from './pages/future-forecast/future-forecast.component';


export const routes: Routes = [

    { path: '', component: SearchZipcodeComponent },



    { path: 'enter-zipcode', component: SearchZipcodeComponent },
    { path: 'forecast/:forecastzipcode', component: FutureForecastComponent },

];
