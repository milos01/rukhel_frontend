import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptor} from './request/RequestInterceptor';
import {AuthInterceptor} from './request/AuthInterceptor';
import {WelcomeComponent} from './welcome/welcome.component';
import {HeaderComponent} from './header/header.component';
import {TasksComponent} from './tasks/tasks.component';
import {SubmitComponent} from './submit/submit.component';
import {DropZoneDirective} from './drop-zone.directive';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        SigninComponent,
        PageNotFoundComponent,
        HomeComponent,
        WelcomeComponent,
        HeaderComponent,
        TasksComponent,
        SubmitComponent,
        DropZoneDirective,
        FileUploadComponent,
        ForgottenPasswordComponent,
        ConfirmationComponent,
        ResetPasswordComponent,
        ProfileComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        FontAwesomeModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ],
    entryComponents: [
        SigninComponent,
        ForgottenPasswordComponent,
        ConfirmationComponent,
        ProfileComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
