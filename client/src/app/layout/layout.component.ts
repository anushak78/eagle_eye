// Copyright (C) 2019-2020 NSEIT Limited, Mumbai. All rights reserved.
//
// This program and the accompanying materials are made available
// under the terms described in the LICENSE file which accompanies
// this distribution. If the LICENSE file was not attached to this
// distribution or for further clarifications, please contact
// legal@nseit.com.
import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  forgot_password_flag = 'email'
  proctorId : string = "";
  constructor(private router: Router,
    private loginSerive:LoginService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.forgot_password_flag = 'email'
    this.proctorId = "proctor3";
    sessionStorage.setItem('proctorId', this.proctorId);
    this.loginSerive.publisizedEmailId.subscribe(data=>{this.emailAddressFromLoginCompoment=data});
  }

  logout() {
  }
  emailAddressFromLoginCompoment:String;
  gotoPage(pageName: string) {
    if(pageName=='login'){
      console.log("email Address :"+this.emailAddressFromLoginCompoment)
      this.loginSerive.logoutUser(this.emailAddressFromLoginCompoment).subscribe(data=>{
        console.log('Logout response :'+data);
        if(data!=undefined){
          console.log('User has been logged off successfully');
        }
        else {
          console.log('Something went wrong');
        }
      })
    }
    this.router.navigate([pageName]);
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {disableClose: true})
  }

  changePassword() {
    if (this.forgot_password_flag == 'email') {
      this.forgot_password_flag = 'otp'
      return
    }
    if (this.forgot_password_flag == 'otp') {
      this.forgot_password_flag = 'pass'
      return
    }
    if (this.forgot_password_flag == 'pass') {
      this.forgot_password_flag = 'email'
      this.dialog.closeAll()
      return
    }
  }
}
