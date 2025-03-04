import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'',component:DashboardComponent,title:"Admin Dashboard"
  },
  {
    path:'download-list',component:DownloadListComponent,title:"Recipe Download list"
  },
  {
    path:"recipe-list",component:RecipeListComponent,title:"Recipe list"
  },
  {
    path:'user-list',component:UserListComponent,title:"user list"
  },
  {
    path:'request-list',component:RequestListComponent,title:"Client request list"
  },
  {
    path:'recipe/add',component:ManageRecipeComponent,title:"Add recipe page"
  },
  {
    path:'recipe/:id/edit',component:ManageRecipeComponent,title:"Edit recipe Page"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }