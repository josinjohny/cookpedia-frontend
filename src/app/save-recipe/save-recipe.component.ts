import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-save-recipe',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './save-recipe.component.html',
  styleUrl: './save-recipe.component.css'
})
export class SaveRecipeComponent {

  allRecipes:any = []

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllSavedRecipes()
  }

  getAllSavedRecipes(){
    this.api.getUserSaveRecipesApi().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);
      
    })
  }

  removeSaveRecipe(id:string){
    this.api.deleteSaveRecipeApi(id).subscribe((res:any)=>{
      this.getAllSavedRecipes()
    })

  }

}
