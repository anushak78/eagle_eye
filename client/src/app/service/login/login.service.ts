import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  private url = "/proctor";
  //url = "https://192.168.0.1:9000/doLogin"

  loginData(data): Observable<any> {
    return this.http.post(this.url + "/dologin", data);
    // this.loggedIn();
  }

  forgetPassword(data): Observable<any> {
    return this.http.post(this.url + "/forgotPassword/", data, this.generateHeaders());
  }

  otpVerify(value, data): Observable<any> {
    console.log("data", data);
    return this.http.post<any>(this.url + `/validateOtp/:${value}`, data)
  }

  resetPassword(data): Observable<any> {
    console.log("reset data", data);
    return this.http.post<any>(this.url + "/resetPassword", data)
  }
  //
  logoutUser(data:String):Observable<any>{
    return this.http.delete<any>(this.url+`/logoutUser/${data}`);
  }

  //creating service to make email or token available throughout the app;
  private emailId = new BehaviorSubject<String>('user has not logged in');
  publisizedEmailId=this.emailId.asObservable();
  publishEmailAddress(email:String){
    debugger;
    this.emailId.next(email);//updating values as per param email when publishEmaiAddress called
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }


  
}

// export interface login{
//   user_id:string;
//   password:string;
// }