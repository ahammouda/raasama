import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlgoSimComponent } from './algo-sim/algo-sim.component';
import { DrawingExamplesComponent } from './drawing-examples/drawing-examples.component';

const routes: Routes = [
  { path: '', redirectTo: '/draw-egs', pathMatch: 'full' },
  { path: 'algo-sim', component: AlgoSimComponent },
  { path: 'draw-egs', component: DrawingExamplesComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
