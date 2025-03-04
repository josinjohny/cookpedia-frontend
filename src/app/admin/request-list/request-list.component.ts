import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {
  allFeedBack:any=[]

  ngOnInit(){
    this.getAllFeedback()
  }
  
  constructor(private api:ApiService){}
  
  getAllFeedback(){
    this.api.allFeedbackApi().subscribe((res:any)=>{
      this.allFeedBack=res
      console.log(res);
      
    })
  }
  
  feedBackStatus(id:string,status:string){
    this.api.updateFeedBackStatusApi(id,status).subscribe((res:any)=>{
      this.getAllFeedback()
    })
  }
}
