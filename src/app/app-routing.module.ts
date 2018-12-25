import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {SubmitComponent} from './submit/submit.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

const routes: Routes = [
    {
        path: '', redirectTo: '/', pathMatch: 'full'
    },
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'submit',
        component: SubmitComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },
];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
