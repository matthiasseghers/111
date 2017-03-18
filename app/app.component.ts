import { Component } from '@angular/core';
import { BeerService } from './shared/services/beer.service';
import { CalculationService } from './shared/services/calculation.service';
import { GeolocationService } from './shared/services/geolocation.service';
import { ToiletService } from './shared/services/toilet.service';
import { Place } from './shared/models/place';

@Component({
  selector: 'my-app',
  styles: [`
    
  `],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {

  constructor( private bs: BeerService,
              private cs: CalculationService,
              private gs: GeolocationService,
              private ts: ToiletService )
  {
	this.getToilet();
  }
  
  message = 'This is the sample message.';
  getToilet() {
  	let userLocation = new Place;
	let toiletLocation = new Place;
  
  	this.gs.getLocation().subscribe(
      data => {
        userLocation.lat = data.coords.latitude;
	    userLocation.long = data.coords.longitude;

	    this.ts.getToilet(userLocation.lat, userLocation.long).subscribe(
		  res => {
		    toiletLocation.lat = <number> res[0];
			toiletLocation.long = <number> res[1];
			console.log(toiletLocation);
		  }
		)
      }
    )
  }
}
