import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // server_url = "http://localhost:3000"
  server_url = "https://cookpedia-server-iwut.onrender.com"


  constructor(private http: HttpClient) { }

  getAllRecipeApi() {
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  // api to add testimony
  addTestimonyApi(reqBody: any) {
    return this.http.post(`${this.server_url}/add-testimonial`, reqBody)
  }

  // api to register user
  addUserApi(reqBody: any) {
    return this.http.post(`${this.server_url}/register`, reqBody)
  }

  // api to login user
  loginApi(reqBody: any) {
    return this.http.post(`${this.server_url}/login`, reqBody)
  }

  appendToken() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('token')
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }

  // api to get a single recipe
  singleRecipeApi(recipeId: string) {
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`, this.appendToken())
  }

  // api to get similar recipe
  similarRecipeApi(cuisine: any) {
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`, this.appendToken())
  }

  downloadRecipeApi(recipeId:any,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`, reqBody, this.appendToken())
  }

  saveRecipeApi(recipeId:any,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())
  }

  // get save recipes

  getUserSaveRecipesApi(){
    return this.http.get(`${this.server_url}/get-save-recipes`,this.appendToken())
  }

  deleteSaveRecipeApi(id:string){
    return this.http.delete(`${this.server_url}/save-recipes/${id}/remove`,this.appendToken())
  }

  getUserDownloadRecipeApi(){
    return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
  }

  editUserApi(reqBody:any){
    return this.http.post(`${this.server_url}/user/edit`,reqBody,this.appendToken())
  }

  allUserApi() {
    return this.http.get(`${this.server_url}/all-users`, this.appendToken())
  }

   // api to get all users
   allDownloadListApi() {
    return this.http.get(`${this.server_url}/download-list`, this.appendToken())
  }

  // api to get all feedback
  allFeedbackApi() {
    return this.http.get(`${this.server_url}/testimonials`, this.appendToken())
  }

  //http://localhost:4000/feedback/67addaa394e64bea63dad1a3/update?status=Approved
  updateFeedBackStatusApi(feedbackId: string, status: string) {
    return this.http.get(`${this.server_url}/feedback/${feedbackId}/update?status=${status}`,this.appendToken())
  }


  //all-approve-feedback api
  getAllApprovedFeedbackApi(){
    return this.http.get(`${this.server_url}/all-approve-feedbacks`)
  }


  addRecipeApi(reqBody: any){
    return this.http.post(`${this.server_url}/add-recipe`,reqBody,this.appendToken())
  }

  getChartData(){
    this.allDownloadListApi().subscribe((res:any)=>{
      console.log(res);

      let DownloadArrayList : any = []
      let output : any = {}
      res.forEach((item:any)=>{
        let cuisine = item.recipeCuisine
        let CurrentCount = item.count
        if(output.hasOwnProperty(cuisine)){
          output[cuisine] += CurrentCount
        }else{
          output[cuisine] = CurrentCount
        }
      })

      for(let cuisine in output){
        DownloadArrayList.push({name: cuisine,y: output[cuisine]})
      }
      console.log(DownloadArrayList);
      localStorage.setItem("chart",JSON.stringify(DownloadArrayList))
      
      
    })
  }

  


}