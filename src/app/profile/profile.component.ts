import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileImage:string = "https://th.bing.com/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?rs=1&pid=ImgDetMain"

  allUserDownloadList:any = []

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getUserDownloads()
    const user = JSON.parse(sessionStorage.getItem("user") || "")
    if(user.profilePic){
      this.profileImage = user.profilePic
    }
  }

  getUserDownloads(){
this.api.getUserDownloadRecipeApi().subscribe((res:any)=>{
  this.allUserDownloadList = res
  console.log(this.allUserDownloadList);
  
  
})
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]

    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
      
    }

  }

  updateProfile(){
    this.api.editUserApi({profilePic:this.profileImage}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profileImage = res.profilePic
      alert(`Profile Updated Successfully`)
    })
  }

}
