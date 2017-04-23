import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LocationService } from 'app/location.service';
import { BsDropdownModule, DatepickerModule, ModalModule } from 'ngx-bootstrap';
import { AchievementDetailsComponent } from './achievement-details/achievement-details.component';
import { AchievementComponent } from './achievement/achievement.component';
import { AchievementsComponent } from './achievements/achievements.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { BadgeComponent } from './badge/badge.component';
import { BadgesComponent } from './badges/badges.component';
import { CheckInComponent } from './check-in/check-in.component';
import { DistancePipe } from './distance.pipe';
import { firebaseConfig } from './firebase-config';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SignedInGuard } from './signed-in.guard';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { UserCheckInsComponent } from './user-check-ins/user-check-ins.component';
import { UserCheckInComponent } from './user-check-in/user-check-in.component';
import { MillisecondsPipe } from './milliseconds.pipe';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ColorPipe } from './color.pipe';
import { ShareButtonsModule } from 'ng2-sharebuttons';
import { FeedComponent } from './feed/feed.component';
import { FeedItemComponent } from './feed-item/feed-item.component';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCvFT5bdfdkeatC06EjeqzRSK39UVR7Buw';

@NgModule({
  declarations: [
    AppComponent,
    AchievementsComponent,
    AchievementComponent,
    LoginComponent,
    HeaderComponent,
    MainComponent,
    AchievementDetailsComponent,
    DistancePipe,
    BadgesComponent,
    BadgeComponent,
    CheckInComponent,
    UserCheckInsComponent,
    UserCheckInComponent,
    MillisecondsPipe,
    UserListComponent,
    UserComponent,
    UserProfileComponent,
    ColorPipe,
    FeedComponent,
    FeedItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ShareButtonsModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAPS_API_KEY
    }),
    BsDropdownModule.forRoot(),
    DatepickerModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [AuthGuard, SignedInGuard, UserService, LocationService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
