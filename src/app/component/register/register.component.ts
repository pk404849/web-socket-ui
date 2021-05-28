import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private commonServices: CommonServicesService
  ) { }

  ngOnInit(): void {
  }
  userModel = new UserModel();
  registerUser() {
    this.commonServices.registerUser(this.userModel).subscribe((res: any) => {
      if (res.status) {
        this.router.navigate(['login']);
        console.log(this.userModel);
        this.userModel = new UserModel();
      }
    });
   
  }

}
