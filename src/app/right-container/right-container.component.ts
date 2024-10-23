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
  isDialogOpen = false;
  selectedWeather: string = '';

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

  onWeatherChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedWeather = selectElement.value;
    if (this.selectedWeather) {
      this.isDialogOpen = true;
    }
  }

  getRecommendations(weather: string): string[] {
    const recommendations = {
      sunny: ['Dont forget your sunscreen', 'Carry your cap', 'Wear sunglasses', 'Stay hydrated'],
      cloudy: ['Take a light jacket', 'Prepare for possible rain'],
      windy: ['Wear a windbreaker', 'Secure loose items', 'Tight your things tightly', 'Hairs should be tied'],
      rainy: ['Carry an umbrella', 'Wear waterproof shoes', 'Time for your raincoat'],
    };
    return recommendations[weather] || [];
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.selectedWeather = '';
  }

}
