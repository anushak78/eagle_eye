import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../service/login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {
  forgot: FormGroup;
  otp: FormGroup;
  reset: FormGroup;
  forgot_email = false;
  Otp = true;
  reset_password = true;
  success = true;
  
  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.forgot = this.fb.group({
      user_id: ['', Validators.required]
    })
    this.otp = this.fb.group({
      otp: ['', Validators.required]
    })
    this.reset = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  forgotPass() {
    console.log("this.forgot.value", this.forgot.value);
    debugger;
    console.log("forgot called");
    this.loginService.forgetPassword(this.forgot.value).subscribe(
      data => {
        console.log(data);
        if (data["success"] == true) {
          this.toastr.success("Otp sent", data["success"])
          this.Otp = false;
          this.forgot_email = true;
          console.log("response", data);
        }
        else if (data["success"] == false) {
          const error = data["msg"]
          this.toastr.error("Invalid Email", error)
          console.log(data);
        }
      },
      err => {
        console.log(err);
      }
    )

  }

  otpSend() {
    let email = this.forgot.controls.user_id.value;
    this.loginService.otpVerify(email, this.otp.value).subscribe(
      data => {
        if (data["success"] == true) {
          this.toastr.success("Reset Password", data["success"])
          this.Otp = true;
          this.reset_password = false
          console.log("response", data);
        }
        else if (data["success"] == false) {
          const error = data["msg"]
          this.toastr.error("Invalid Email", error)
          console.log(data);
        }
      },
      err => {
        console.log(err);
      }
    )

  }

  resetpass() {
    if (this.reset.controls.password.value == this.reset.controls.confirmPassword.value) {
      let user_id = this.forgot.controls.user_id.value; 
      let password = this.reset.controls.password.value;
      let confirmPassword = this.reset.controls.confirmPassword.value;
      this.loginService.resetPassword({ user_id: user_id, confirmPassword: confirmPassword,password:password }).subscribe(
        data => {
          if (data["success"] == true) {
            this.toastr.success("Succesfully", data["success"])
            this.reset_password = true;
            this.success = false;
            console.log("response", data);
          }
          else if (data["success"] == false) {
            const error = data["msg"]
            this.toastr.error("Password mismatch", error)
            console.log(data);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
    else {
      this.toastr.warning('password mismatched')
    }
  }
}
