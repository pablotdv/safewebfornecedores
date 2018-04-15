import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./not-found/not-found.component";
import { UsersComponent } from "./users/users.component";
import { AccountLoginComponent } from "./account-login/account-login.component";
import { AccountRegisterComponent } from "./account-register/account-register.component";
import { AuthGuard } from "./auth.guard";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { UserDeleteComponent } from "./users/user-delete/user-delete.component";

const appRoutes: Routes = [
    {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]
    },
    { path: 'user/:id', component: UserEditComponent },
    { path: 'user/delete/:id', component: UserDeleteComponent },
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