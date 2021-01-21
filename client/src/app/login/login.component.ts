import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageDialogComponent} from "../dialog/message/message.component";
import {Router} from "@angular/router";
import { MatDialog } from '@angular/material';
import { LoginService } from '../service/login/login.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInForm = new FormGroup({
    user_id: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });
  forgot_password_flag = 'email'

  @ViewChild('messageDlg', {static: false})
  messageDlg: MessageDialogComponent;

  constructor(private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.forgot_password_flag = 'email'
  }

  @ViewChild('forgotPassword', { static: true }) editDialog: TemplateRef<any>;
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, {disableClose: true})
  }

  canSubmit(): boolean {
    return this.signInForm.valid;
  }

  @ViewChild(MessageDialogComponent) MessageDialog;
  async submit() {
      this.router.navigate(['dashboard']);
      this.loginService.loginData(this.signInForm.value).subscribe(
        data => {
          console.log(data);
          if (data["success"] == true) {
            this.toastr.success('Successfully logged in');
            console.log("response", data);
            this.loginService.publishEmailAddress(this.signInForm.value.user_id);
            localStorage.setItem('token', data['payload'])
            this.router.navigate(['dashboard']);
            
          }
          else if (data["success"] == false) {
            const error = data["msg"]
            console.log(data);
            this.MessageDialog.openDialog(error);
          }
        },
        err => {
          console.log("error", err);
          console.log(err);
          this.toastr.error('error');
        }
      )
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
