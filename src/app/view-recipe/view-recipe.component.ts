import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../services/api.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {
  recipeId: string = ""
  recipe: any = {}
  allRelatedRecipe:any=[]

  constructor(private route: ActivatedRoute, private api: ApiService) { }
  ngOnInit() {
    this.route.params.subscribe((resizeBy: any) => {
      this.recipeId = resizeBy.id
      console.log(this.recipeId);
      this.getRecipeDetails(this.recipeId)

    })
  }

  getRecipeDetails(recipeId: any) {
    this.api.singleRecipeApi(recipeId).subscribe((res: any) => {
      this.recipe = res
      console.log(this.recipe);

      this.getRelatedRecipeDetails(res.cuisine)
    })
  }

  getRelatedRecipeDetails(cuisine:string){
    this.api.similarRecipeApi(cuisine).subscribe((res:any)=>{

      if(res.length>1){

        this.allRelatedRecipe=res.filter((item:any)=>item.name!=this.recipe.name)
        console.log(this.allRelatedRecipe);
      }else{
        this.allRelatedRecipe=[]
      }
      

    })
  }

  downloadRecipe(){
    this.api.downloadRecipeApi(this.recipeId, this.recipe).subscribe((res:any)=>{
      this.api.getChartData()
      this.generatePDF()
    })
  }


  generatePDF(){
    const pdf = new jsPDF()
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10)

    pdf.setFontSize(12)
    pdf.setTextColor("black")
    pdf.text(`cuisine : ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings : ${this.recipe.Servings}`,10,25)
    pdf.text(`Mode of Cooking : ${this.recipe.difficulty}`,10,30)
    pdf.text(`Total preparation Time : ${this.recipe.prepTimeMinutes} Minutes`,10,35)
    pdf.text(`Total Cooking Time : ${this.recipe.cookTimeMinutes} Minutes`,10,40)
    pdf.text(`Total Calorie Per Servings : ${this.recipe.caloriesPerServing} Minutes`,10,45)


    let head = [['Ingredients Needed','cooking instruction']]

    let body = []
    body.push([this.recipe.ingredients,this.recipe.instructions])

    autoTable(pdf, {head,body,startY:50})
    pdf.output('dataurlnewwindow')
    pdf.save('download-recipe.pdf')






  }

  saveRecipe(){
    this.api.saveRecipeApi(this.recipeId, this.recipe).subscribe({
      next:(res:any)=>{
        alert(`Recipe Added Successfully to your collection`)
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }



}