import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule} from '@angular/common/http';

// No need to import AppComponent or LeftContainerComponent here because they are standalone

@NgModule({
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule
    
    // No need to import standalone components here
  ],
  providers: [],
  bootstrap: [
    /* AppComponent is bootstrapped elsewhere if it's standalone */]
})
export class AppModule { }
