import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { SignedInGuard } from './signed-in.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [SignedInGuard]
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'achievements',
    component: AchievementsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
