import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDetails } from '../Models/LocationDetails';
import { WeatherDetails } from '../Models/WeatherDetails';
import { TemperatureData } from '../Models/TemperatureData';
import { TodayData } from '../Models/TodayData';
import { WeekData } from '../Models/WeekData';
import { TodaysHighlight } from '../Models/TodaysHighlight';
import { Observable } from 'rxjs';
import { EnvironmentalVariables } from '../Environment/EnvironmentVariables';
//import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  //variables which will be filled by api endpoints
  locationDetails?: LocationDetails;
  weatherDetails?: WeatherDetails;

  //variables that have the extracted data from the api endpoint variables
  temperatureData: TemperatureData; //for left container data

  todayData?: TodayData[] = []; // for right container data
  weekData?: WeekData[] = [];//right container data
  todayshighlight?: TodaysHighlight ;//right container data

  //variables to be used for API calls

  cityName:string = 'Pune'
  language:string = 'en-US'
  date:string = '20200622' //regardless of it, it will give current date
  units:string = 'm';

  //Variable holding current time;
  currentTime:Date;

  //in order to keep week active when loading the page (variables to control tabs)
  today:boolean = false;
  week:boolean = true;

  //variables to control metric value
  celsius:boolean = true;
  fahrenhiet:boolean = false;

  constructor(private httpClient : HttpClient) {
    this.getData();
   }

   getSummaryImage(summary:string):string{
    //this folder address contains the images
    var baseAddress = 'assets/';

    //respective image names
    var cloudySunny = 'cloudyandsunny.png';
    var rainSunny = 'rainyandsunny.png';
    var windy = 'windy.png';
    var sunny = 'sun.png';
    var rainy = 'rainy.png';


    if(String(summary).includes("Partly Cloudy") || String(summary).includes("P Cloudy")) return baseAddress + cloudySunny;
    else if(String(summary).includes("Partly Rainy") || String(summary).includes("P Rainy")) return baseAddress + rainSunny;
    else if(String(summary).includes("wind"))return baseAddress + windy;
    else if(String(summary).includes("rain")) return baseAddress + rainy;
    else if(String(summary).includes("Sun")) return baseAddress + sunny;

    return baseAddress + cloudySunny;
   }



  //method to create a chunk for left container using model temperaturedata
  fillTemperatureDataModel(){
    this.currentTime = new Date();
    this.temperatureData.day = this.weatherDetails['v3-wx-observations-current'].dayOfWeek;
    this.temperatureData.time = `${String(this.currentTime.getHours()).padStart(2,'0')}:${String(this.currentTime.getMinutes()).padStart(2,'0')}`;
    this.temperatureData.temperature = this.weatherDetails['v3-wx-observations-current'].temperature;
    this.temperatureData.location = `${this.locationDetails.location.city[0]},${this.locationDetails.location.country[0]}`;
    this.temperatureData.rainPercent = this.weatherDetails['v3-wx-observations-current'].precip24Hour;
    this.temperatureData.summaryPhrase = this.weatherDetails['v3-wx-observations-current'].wxPhraseShort;
    this.temperatureData.summaryImage = this.getSummaryImage(this.temperatureData.summaryPhrase);
    


  }

  //method to create a chunk for right container using model weekdata
  fillWeekData(){
    var weekCount = 0;

    while(weekCount < 7 ) {
      this.weekData.push(new WeekData());
      this.weekData[weekCount].day = this.weatherDetails['v3-wx-forecast-daily-15day'].dayOfWeek[weekCount].slice(0, 3);
      this.weekData[weekCount].tempMax = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMax[weekCount];
      this.weekData[weekCount].tempMin = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMin[weekCount];
      this.weekData[weekCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-daily-15day'].narrative[weekCount]);
      
      weekCount++;
    }

  }


  fillTodayData(){
    var todayCount = 0;
    while(todayCount < 7){
      this.todayData.push(new TodayData());
      this.todayData[todayCount].time = this.weatherDetails['v3-wx-forecast-hourly-10day'].validTimeLocal[todayCount].slice(11,16);
      this.todayData[todayCount].temperature = this.weatherDetails['v3-wx-forecast-hourly-10day'].temperature[todayCount];
      this.todayData[todayCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-hourly-10day'].wxPhraseShort[todayCount]);
      todayCount++;

    }
  }


  getTimeFromString(localTime:string){
    return localTime.slice(11, 16);
    }
  //method to get todays highlight data from the base variable
  fillTodaysHighlight(){
    this.todayshighlight.airQuality = this.weatherDetails['v3-wx-globalAirQuality'].globalairquality.airQualityIndex;
    this.todayshighlight.humidity= this.weatherDetails['v3-wx-observations-current'].relativeHumidity;
    this.todayshighlight.sunrise = this.getTimeFromString(this.weatherDetails['v3-wx-observations-current'].sunriseTimeLocal);
    this.todayshighlight.sunset = this.getTimeFromString(this.weatherDetails['v3-wx-observations-current'].sunsetTimeLocal);
    this.todayshighlight.uvIndex = this.weatherDetails['v3-wx-observations-current'].uvIndex;
    this.todayshighlight.visibility = this.weatherDetails['v3-wx-observations-current'].visibility;
    this.todayshighlight.windStatus = this.weatherDetails['v3-wx-observations-current'].windSpeed;

  }

   //method to create useful data chunks for ui using the data receive from the api
   prepareData():void{
    //setting left container data model properties
    this.fillTemperatureDataModel();
    this.fillWeekData();
    this.fillTodayData();
    this.fillTodaysHighlight();
    console.log(this.weatherDetails);
    console.log(this.temperatureData);
    console.log(this.weekData);
    console.log(this.todayData);
    console.log(this.todayshighlight);

   }


   celsiusToFahrenheit(celsius:number):number{
    return +((celsius * 1.8) + 32).toFixed(2);
   }

   fahrenheitToCelsius(fahrenheit:number):number{
    return +((fahrenheit - 32) * 0.555).toFixed(2);
   }
   //method to get location details from the api using the variable cityname as the input
  getLocationDetails(cityName:string, language:string):Observable<LocationDetails>{
    return this.httpClient.get<LocationDetails>(EnvironmentalVariables.weatherApiLocationBaseURL,{
      headers: new HttpHeaders()
      .set(EnvironmentalVariables.XRapidAPIKeyName,EnvironmentalVariables.xRapidAPIKeyValue)
    .set(EnvironmentalVariables.xRapidAPIHostName, EnvironmentalVariables.xRapidAPIHostValue),
      params : new HttpParams()
      .set('query', cityName)
      .set('language', language)
    });
  }

  getWeatherReport(date:string, latitude:number, longitude:number, language:string, units:string):Observable<WeatherDetails>{
    return this.httpClient.get<WeatherDetails>(EnvironmentalVariables.weatherApiForecastBaseURL,{
    headers: new HttpHeaders()
    .set(EnvironmentalVariables.XRapidAPIKeyName,EnvironmentalVariables.xRapidAPIKeyValue)
    .set(EnvironmentalVariables.xRapidAPIHostName, EnvironmentalVariables.xRapidAPIHostValue),
      params : new HttpParams()
      .set('date', date)
      .set('latitude', latitude)
      .set('longitude',longitude)
      .set('language', language)
      .set('units', units)
    });

  }

  getData(){
    this.todayData = [];
    this.weekData = [];
    this.temperatureData = new TemperatureData();
    this.todayshighlight = new TodaysHighlight();
    var latitude;
    var longitude;
    this.getLocationDetails(this.cityName,this.language).subscribe({
      next:(response)=>{
        this.locationDetails = response;
        latitude = this.locationDetails?.location.latitude[0];
        longitude = this.locationDetails?.location.longitude[0];


        //once we get the values for lat and long , we can call for the getweatherreport method.
          this.getWeatherReport(this.date,latitude,longitude,this.language,this.units).subscribe({
            next:(response)=>{
              this.weatherDetails = response;


              this.prepareData();

            }
            }
          )
      
      },
    });

  


}
}

//this file will be mediator to transfer data and gather data through api