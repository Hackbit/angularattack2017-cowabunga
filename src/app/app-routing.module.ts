import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AchievementsComponent } from './achievements/achievements.component';

const routes: Routes = [
  {
    path: '',
    component: AchievementsComponent
  },
  {
    path: 'my-profile',
    component: MyProfileComponent
  },
  {
    path: 'achievements',
    component: AchievementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
