import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GFormComponent } from './components/gform/gform.component';
import { CardComponent } from './components/card/card.component';
import { ErrorComponent } from './components/error/error.component';
import { CardValidationComponent } from './components/card-validation/card-validation.component';


const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: GFormComponent },
  { path :'card', component : CardComponent},
  { path: 'card-validation', component: CardValidationComponent },
  { path : '**', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
