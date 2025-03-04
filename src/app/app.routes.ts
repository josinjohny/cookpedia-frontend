import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SaveRecipeComponent } from './save-recipe/save-recipe.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { PnfComponent } from './pnf/pnf.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path:'admin', canActivate:[authGuard],  loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
    }, 
    {
        path:"",component:HomeComponent, title:"Home Page"
    },
    {
        path:"about",component:AboutComponent, title:"About Page"
    },
    {
        path:"contact",component:ContactComponent, title:"Contact Page"
    },
    {
        path:"login",component:LoginComponent, title:"Login Page"
    },
    {
        path:"recipes",component:RecipesComponent, title:"Recipe Page"
    },
    {
        path:"register",component:RegisterComponent, title:"Register Page"
    },
    {
        path:"profile", canActivate:[authGuard], component:ProfileComponent, title:"Profile Page"
    },
    {
        path:"save-recipe", canActivate:[authGuard],component:SaveRecipeComponent, title:"Save Recipe Page"
    },
    {
        path:"recipe/:id/view",canActivate:[authGuard], component:ViewRecipeComponent, title:"View Recipes Page"
    },
    {
        path:"**",component:PnfComponent, title:"Page not found"
    }
];
