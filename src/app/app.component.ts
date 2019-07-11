import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	REFRESHMILLI = 100;

	hourlyPay = 50;
	money = 0;
	timeStart:string;
	timeSpan: number;
	timeSpanString: string;
	wSTTimestamp: number;
	menuIsShown = true;
	constructor(private cookieService: CookieService) {}
	ngOnInit() {
		console.log("ngOnInit()");
		this.init();
		setInterval(() => {
			this.update();
		}, this.REFRESHMILLI);
	}

	init() {
		console.log("init()");
		this.timeStart = this.getCookie("timeStart", "0900");
		this.hourlyPay = this.getCookie("hourlyPay", 50);
		this.wSTTimestamp = new Date().setHours(parseInt(this.timeStart.substring(0, 2)), parseInt(this.timeStart.substring(2, 4)), 0, 0);
	}

	fullUpdate() {
		console.log("fullUpdate()");
		this.cookieService.set( 'timeStart', this.timeStart );
		this.cookieService.set( 'hourlyPay', this.hourlyPay + "" );
		this.wSTTimestamp = new Date().setHours(parseInt(this.timeStart.substring(0, 2)), parseInt(this.timeStart.substring(2, 4)), 0, 0);
	}

	update() {
		const nowTimestamp = Date.now();
		this.timeSpan = (nowTimestamp - this.wSTTimestamp);
		this.timeSpanString = this.msToTime(this.timeSpan);
		this.money = this.hourlyPay / 60 / 60 / 1000 * this.timeSpan;
	}

	hideMenuClick() {
		this.menuIsShown = false;
	}

	showMenuClick() {
		this.menuIsShown = true;
	}

	msToTime(s) {
	  var ms = s % 1000;
	  s = (s - ms) / 1000;
	  var secs = s % 60;
	  s = (s - secs) / 60;
	  var mins = s % 60;
	  var hrs = (s - mins) / 60;
	  return hrs.toString().padStart(2, "0") + ':' + mins.toString().padStart(2, "0") + ':' + secs.toString().padStart(2, "0") + '.' + ms.toString().padStart(3, "0");
	}

	getCookie(parameter, defaultValue) {
		const value = this.cookieService.get(parameter);
		if(value == "") {
			console.log("cookie " + parameter + " not found.")
			return defaultValue;
		} else {
			return value;
		}
	}
}