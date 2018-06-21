import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AlgoSimComponent } from './algo-sim/algo-sim.component';
import { AppRoutingModule } from './/app-routing.module';
import { DrawingExamplesComponent } from './drawing-examples/drawing-examples.component';

@NgModule({
  declarations: [
    AppComponent,
    AlgoSimComponent,
    DrawingExamplesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
