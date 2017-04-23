import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AchievementsComponent } from './achievements/achievements.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { SignedInGuard } from './signed-in.guard';
import { MainComponent } from './main/main.component';
import { AchievementDetailsComponent } from './achievement-details/achievement-details.component';
import { CheckInComponent } from './check-in/check-in.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FeedComponent } from './feed/feed.component';
import { AddAchievementComponent } from './add-achievement/add-achievement.component';

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
      },
      {
        path: 'user-list',
        component: UserListComponent
      },
      {
        path: 'user-profile/:id',
        component: UserProfileComponent
      },
      {
        path: 'feed',
        component: FeedComponent
      },
      {
        path: 'achcreat0r',
        component: AddAchievementComponent
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
