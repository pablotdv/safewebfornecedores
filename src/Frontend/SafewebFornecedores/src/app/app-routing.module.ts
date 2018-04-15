import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { PageNotFoundComponent } from "./not-found/not-found.component";
import { UsersComponent } from "./users/users.component";
import { AccountLoginComponent } from "./account-login/account-login.component";
import { AuthGuard } from "./auth.guard";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { UserDeleteComponent } from "./users/user-delete/user-delete.component";
import { UserRegisterComponent } from "./users/user-register/user-register.component";
import { FornecedoresComponent } from "./fornecedores/fornecedores.component";
import { FornecedorCadastrarComponent } from "./fornecedores/fornecedor-cadastrar/fornecedor-cadastrar.component";
import { FornecedorEditarComponent } from "./fornecedores/fornecedor-editar/fornecedor-editar.component";
import { FornecedorExcluirComponent } from "./fornecedores/fornecedor-excluir/fornecedor-excluir.component";
import { CategoriasComponent } from "./categorias/categorias.component";
import { CategoriaCadastrarComponent } from "./categorias/categoria-cadastrar/categoria-cadastrar.component";
import { CategoriaEditarComponent } from "./categorias/categoria-editar/categoria-editar.component";
import { CategoriaExcluirComponent } from "./categorias/categoria-excluir/categoria-excluir.component";

const appRoutes: Routes = [
    {
        path: 'users', component: UsersComponent, canActivate: [AuthGuard],
    },
    {
        path: 'user',
        canActivate: [AuthGuard],
        children: [
            { path: 'register', component: UserRegisterComponent },
            { path: ':id', component: UserEditComponent },
            { path: 'edit/:id', component: UserEditComponent },
            { path: 'delete/:id', component: UserDeleteComponent },
        ]
    },
    {
        path: 'fornecedores', component: FornecedoresComponent, canActivate: [AuthGuard]
    },
    {
        path: 'fornecedor', canActivate: [AuthGuard],
        children: [
            { path: 'cadastrar', component: FornecedorCadastrarComponent },
            { path: ':id', component: FornecedorEditarComponent },
            { path: 'editar/:id', component: FornecedorEditarComponent },
            { path: 'excluir/:id', component: FornecedorExcluirComponent },
        ]
    },

    {
        path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard]
    },
    {
        path: 'categoria', canActivate: [AuthGuard],
        children: [
            { path: 'cadastrar', component: CategoriaCadastrarComponent },
            { path: ':id', component: CategoriaEditarComponent },
            { path: 'editar/:id', component: CategoriaEditarComponent },
            { path: 'excluir/:id', component: CategoriaExcluirComponent },
        ]
    },

    
    { path: 'account/login', component: AccountLoginComponent, },
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