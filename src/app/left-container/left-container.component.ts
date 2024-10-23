import { Component } from '@angular/core';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../Services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-left-container',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './left-container.component.html',
  styleUrl: './left-container.component.css'
})
export class LeftContainerComponent {

  // variables for font awesome icons


  //variables for left-nav-bar search icons
  faMagnifyingGlass:any = faMagnifyingGlass;
  faLocation:any = faLocation

  //variables for temperature summary
  faCloud:any = faCloud;
  faCloudRain:any = faCloudRain;


  constructor(public weatherService:WeatherService){}
  onSearch(location:string){
    this.weatherService.cityName = location;
    this.weatherService.getData();

  }

  showFeedbackForm: boolean = false;
    feedbackName: string = '';
    feedbackEmail: string = '';
    feedbackMessage: string = '';

    openFeedbackForm() {
        this.showFeedbackForm = true;
    }

    closeFeedbackForm() {
        this.showFeedbackForm = false;
        this.feedbackName = '';  // Optionally clear fields on close
        this.feedbackEmail = '';
        this.feedbackMessage = '';
    }

    submitFeedback() {
        // Handle form submission logic
        console.log('Feedback submitted:', {
            name: this.feedbackName,
            email: this.feedbackEmail,
            message: this.feedbackMessage
        });
        this.closeFeedbackForm(); // Close the form after submission
    }


}
