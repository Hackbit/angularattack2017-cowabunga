import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { SignedInGuard } from './signed-in.guard';
import { MainComponent } from './main/main.component';
import { AchievementDetailsComponent } from './achievement-details/achievement-details.component';
import { CheckInComponent } from './check-in/check-in.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [SignedInGuard]
  },
  {
    path: 'app',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'my-profile',
        component: MyProfileComponent
      },
      {
        path: 'achievements',
        component: AchievementsComponent
      },
      {
        path: 'achievement/:id',
        component: AchievementDetailsComponent
      },
      {
        path: 'achievement/:id/check-in',
        component: CheckInComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
