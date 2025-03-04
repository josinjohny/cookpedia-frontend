import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedin:boolean = false
  loggedUsername:string = ""

  constructor(private router:Router){}

  ngOnInit(){
    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
      this.isLoggedin = true
      this.loggedUsername = JSON.parse(sessionStorage.getItem("user") || "").username
    }else{
      this.isLoggedin = false
      this.loggedUsername = ""
    }
  }

  logout(){
    sessionStorage.clear()
    localStorage.clear()
    this.isLoggedin = false
    this.loggedUsername = ""
    this.router.navigateByUrl("/")
  }

}
