import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/model/login-model';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { WebSocketAPI} from 'src/app/services/websocket/web-socket-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private commonServices: CommonServicesService,
    
  ) { }
  //webSocketAPI:any;
  ngOnInit(): void {
   

  }

  loginModel = new LoginModel();
  login(){
    this.commonServices.login(this.loginModel).subscribe((res:any)=>{
      if(res != null && res.data != null){
        console.log('res===> ',res.data);
        localStorage.setItem("loginUser",JSON.stringify(res.data));
        // this.webSocketAPI._connect();
        this.router.navigate(['message-box']);
      }
    });
    console.log(this.loginModel.userName+' === '+ this.loginModel.password);
}

}
