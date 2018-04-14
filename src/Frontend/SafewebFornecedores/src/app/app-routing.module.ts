import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./not-found/not-found.component";
import { AccountComponent } from "./account/account.component";
import { AccountLoginComponent } from "./account-login/account-login.component";
import { AccountRegisterComponent } from "./account-register/account-register.component";
import { AuthGuard } from "./auth.guard";

const appRoutes: Routes = [
    { path: 'account', component: AccountComponent },
    { path: 'account/login', component: AccountLoginComponent, },
    {
        path: 'account/register',
        component: AccountRegisterComponent,
        canActivate: [AuthGuard]
    },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }