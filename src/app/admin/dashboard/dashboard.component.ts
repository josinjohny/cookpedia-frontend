import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  selected =new Date()
  isSideBarOpen:boolean = true
  columnWidth:string = "col-lg-10"
  userCount : number = 0
  recipeCount : number = 0
  downloadCount : number = 0
  requestCount : number = 0
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {}
  
  constructor(private api:ApiService, private router:Router){
    if(localStorage.getItem("chart")){
      let chartData = JSON.parse(localStorage.getItem("chart")||"")
    
    this.chartOptions = {
      chart :{
        type: 'bar'
      },
      title:{
        text: "Analysis of download recipe based in cuisine",
        align: "left"
      },
      xAxis:{
        type: 'category'
      },
      yAxis:{
        title:{
          text: 'Total Download Recipe Count'
        }
      },
      legend:{
        enabled:false
      },
      credits:{
        enabled:false
      },
      series:[{
        name:"cuisine",
        colorByPoint:true,
        type:"bar",
        data:chartData
      }]
    }
  }
  }

  ngOnInit(){
    this.getUserCount()
    this.getRecipeCount()
this.getDownloadCount()
this.getRequestCount()

  }


  menuBtnClick(){
    this.isSideBarOpen = !this.isSideBarOpen
    this.isSideBarOpen ? this.columnWidth = "col-lg-10" : this.columnWidth = "col"
  }

  getUserCount(){
    this.api.allUserApi().subscribe((res:any)=>{
      this.userCount = res.length
    })

  }

  getRecipeCount(){
    this.api.getAllRecipeApi().subscribe((res:any)=>{
      this.recipeCount = res.length
    })

  }

  getDownloadCount(){
    this.api.allDownloadListApi().subscribe((res:any)=>{
      this.downloadCount = res.map((item:any)=>item.count).reduce((a:any, b:any)=>a+b)
    })

  }

  getRequestCount(){
    this.api.allFeedbackApi().subscribe((res:any)=>{
      this.requestCount = res.filter((item:any)=>item.status=="pending").length
    })
  }


  logOutAdmin(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl('/')

  }

}
