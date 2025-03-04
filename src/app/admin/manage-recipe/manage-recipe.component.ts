import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { RecipeModel } from '../model/recipeModel';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

  cuisineArray:any = []
  mealsTypeArray:any = []
  recipeDetails:RecipeModel = {}
  ingredients:any = []
  instructions:any = []
  mealType:any = []


      constructor(private api:ApiService, private router:Router){}

      ngOnInit(){
        this.getAllRecipes()
      }


      getAllRecipes(){
        this.api.getAllRecipeApi().subscribe((res:any)=>{
          
  
          //Cuisine
          res.forEach((item:any) => {
            !this.cuisineArray.includes(item.cuisine)&&this.cuisineArray.push(item.cuisine)
            
          })
          console.log(this.cuisineArray);
  
  
          const dummyMeals = res.map((item:any)=>item.mealType)
          // console.log(dummyMeals.flat(Infinity));
  
          const flatDummyArray = dummyMeals.flat(Infinity)
          flatDummyArray.forEach((item:any)=>{
            !this.mealsTypeArray.includes(item) && this.mealsTypeArray.push(item)
          })
  console.log(this.mealsTypeArray);
  
          
          
          
        })
      }

      addRecipe(){
        console.log(this.recipeDetails);
        this.recipeDetails.ingredients = this.ingredients
        this.recipeDetails.instructions = this.instructions
        this.recipeDetails.mealType = this.mealType

        const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = this.recipeDetails

        if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
          // alert(`Proceed for api call`)

          this.api.addRecipeApi(this.recipeDetails).subscribe({
            next:(res:any)=>{
              alert(`Recipe added successfully`)
              this.recipeDetails = {}
              this.ingredients = []
              this.instructions = []
              this.mealType = []
              this.router.navigateByUrl("/admin/recipe-list")
            },
            error:(reason:any)=>{
              alert(reason.error)
            }
          })

        }else{
          alert(` Fill the form completely `)
        }
      }


      addIngredients(ingredientsInput:any){
        if(ingredientsInput.value){
          this.ingredients.push(ingredientsInput.value)
          ingredientsInput.value=""
          console.log(this.ingredients);
          
        }
      }

      removeIngredients(value:string){
        this.ingredients = this.ingredients.filter((item:string)=>item !=value)
      }


      addInstructions(instructionsInput:any){
        if(instructionsInput.value){
          this.instructions.push(instructionsInput.value)
          instructionsInput.value=""
          console.log(this.instructions);
          
        }
      }

      removeInstructions(value:string){
        this.instructions = this.instructions.filter((item:string)=>item !=value)
      }


      mealTypeSelect(event:any){
        if(event.target.checked){
          !this.mealType.includes(event.target.name) && this.mealType.push(event.target.name)
        }else{
          this.mealType = this.mealType.filter((item:string)=>item!=event.target.name)
        }

      }






  

}
