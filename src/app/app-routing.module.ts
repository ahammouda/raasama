import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlgoSimComponent } from './algo-sim/algo-sim.component';

const routes: Routes = [
  { path: '', redirectTo: '/algo-sim', pathMatch: 'full' },
  { path: 'algo-sim', component: AlgoSimComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
