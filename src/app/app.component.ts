import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	REFRESHMILLI = 100;

	hourlyPay = 50;
	money = 0;
	timeStart = "0900";
	timeSpan: number;
	timeSpanString: string;
	wSTTimestamp: number;
	constructor() {}
	ngOnInit() {
		console.log("ngOnInit()");
		this.init();
		setInterval(() => {
			this.update();
		}, this.REFRESHMILLI);
	}
	init() {
		this.wSTTimestamp = new Date().setHours(parseInt(this.timeStart.substring(0, 2)), parseInt(this.timeStart.substring(2, 4)), 0, 0);
	}
	update() {
		const nowTimestamp = new Date();
		this.timeSpan = (nowTimestamp - this.wSTTimestamp);
		this.timeSpanString = this.msToTime(this.timeSpan);
		this.money = 50 / 60 / 60 / 1000 * this.timeSpan;
	}
	msToTime(s) {
	  var ms = s % 1000;
	  s = (s - ms) / 1000;
	  var secs = s % 60;
	  s = (s - secs) / 60;
	  var mins = s % 60;
	  var hrs = (s - mins) / 60;

	  return hrs + ':' + mins + ':' + secs + '.' + ms;
	}
}