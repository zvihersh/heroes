import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllHeroesComponent } from './components/all-heroes/all-heroes.component';
import { AuthGuard } from './core/services/auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [{
  path: '', redirectTo: 'all-heroes', pathMatch: 'full'
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'all-heroes',
  component: AllHeroesComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
