import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-right-container',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
templateUrl: './right-container.component.html',
  styleUrl: './right-container.component.css'
})
export class RightContainerComponent {

  constructor(public weatherService : WeatherService){};

//fa icons for thumbs up/down and smile/frown
  faThumbsUp:any = faThumbsUp;
  faThumbsDown:any = faThumbsDown;
  faFaceSmile:any = faFaceSmile;
  faFaceFrown:any = faFaceFrown;

  

  //functions to control tab values or tab states

  //function for onclick
  onTodayClick(){
    this.weatherService.today = true;
    this.weatherService.week = false;
   
  }

  onWeekClick(){
    this.weatherService.week = true;
    this.weatherService.today = false;
  }

  //functions to control metric values
  onCelsiusClick(){
    this.weatherService.celsius = true;
    this.weatherService.fahrenhiet = false;
  }

  onFahrenhietClick(){
    this.weatherService.fahrenhiet = true;
    this.weatherService.celsius = false;
  }
}
