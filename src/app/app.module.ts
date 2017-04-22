import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { firebaseConfig } from './firebase-config';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AchievementsComponent } from './achievements/achievements.component';
import { AchievementComponent } from './achievement/achievement.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { SignedInGuard } from './signed-in.guard';
import { HeaderComponent } from './header/header.component';
import { LocationService } from 'app/location.service';
import { MainComponent } from './main/main.component';
import { DistancePipe } from './distance.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MyProfileComponent,
    AchievementsComponent,
    AchievementComponent,
    LoginComponent,
    HeaderComponent,
    MainComponent,
    DistancePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthGuard, SignedInGuard, UserService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
