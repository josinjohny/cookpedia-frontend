import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SearchPipe, FormsModule ,NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  allRecipes:any = []
  cuisineArray:any = []
  mealsTypeArray:any = []
  dummyAllRecipes:any = []
  searchKey:string=""
  p: number = 1;
  
  
    constructor(private api:ApiService, private router:Router){}
  
    ngOnInit(){
      this.getAllRecipes()
    }
  
  
  
    getAllRecipes(){
      this.api.getAllRecipeApi().subscribe((res:any)=>{
        this.allRecipes = res
        console.log(this.allRecipes);

        //Cuisine
        this.allRecipes.forEach((item:any) => {
          !this.cuisineArray.includes(item.cuisine)&&this.cuisineArray.push(item.cuisine)
          
        })
        console.log(this.cuisineArray);
        this.dummyAllRecipes = this.allRecipes


        const dummyMeals = this.allRecipes.map((item:any)=>item.mealType)
        console.log(dummyMeals.flat(Infinity));

        const flatDummyArray = dummyMeals.flat(Infinity)
        flatDummyArray.forEach((item:any)=>{
          !this.mealsTypeArray.includes(item) && this.mealsTypeArray.push(item)
        })
console.log(this.mealsTypeArray);

        
        
        
      })
    }

    filterAllRecipes(key:string, value:string){
    this.allRecipes =  this.dummyAllRecipes.filter((item:any)=>item[key].includes(value))
    }

    viewRecipes(recipeId:string){
      if(sessionStorage.getItem("token")){
        this.router.navigateByUrl(`/recipe/${recipeId}/view`)
      }

    }

}
