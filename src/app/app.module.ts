import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment.prod';
import { MaterialModule } from 'src/material.module';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ResultComponent } from './components/dialogs/result/result.component';
import { ShowcaseComponent } from './components/pages/showcase/showcase.component';
import localeDe from '@angular/common/locales/de';
import { LoginComponent } from './components/pages/login/login.component';
import { DateAdapter } from '@angular/material/core';
import { CustomeDateAdapter } from 'src/custome-date-adapter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditTimeComponent } from './components/dialogs/edit-time/edit-time.component';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ResultComponent,
    ShowcaseComponent,
    LoginComponent,
    EditTimeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    { provide: DatePipe },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: DateAdapter, useClass: CustomeDateAdapter },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
