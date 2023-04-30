import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { BannerComponent } from './components/pages/banner/banner.component';
import { ToasterComponent } from './components/dialogs/toaster/toaster.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from './components/dialogs/delete-confirmation/delete-confirmation.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
// import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

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
    BannerComponent,
    ToasterComponent,
    DeleteConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: DatePipe },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: DateAdapter, useClass: CustomeDateAdapter },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MAT_SNACK_BAR_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
