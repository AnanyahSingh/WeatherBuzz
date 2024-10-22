import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftContainerComponent } from "./left-container/left-container.component";
import { RightContainerComponent } from "./right-container/right-container.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeatherService } from './Services/weather.service';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeftContainerComponent, RightContainerComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WeatherApp';
  constructor(private weatherService: WeatherService) {
}
}
