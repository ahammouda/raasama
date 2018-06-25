import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlgoSimComponent } from './algo-sim/algo-sim.component';
import { DrawingExamplesComponent } from './drawing-examples/drawing-examples.component';
import { DrawReSimComponent } from './draw-re-sim/draw-re-sim.component';

const routes: Routes = [
  { path: '', redirectTo: '/draw-re-sim', pathMatch: 'full' },
  { path: 'algo-sim', component: AlgoSimComponent },
  { path: 'draw-egs', component: DrawingExamplesComponent },
  { path: 'draw-re-sim', component: DrawReSimComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
