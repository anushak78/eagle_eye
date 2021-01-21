import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }
  private url = ""
  
  getIFrameURL(data: any): Observable<any> {
    return this.http.get(this.url + '/dashboard/getiframeurl', { params: data });
  }

  getProject(data: any): Observable<any>{
    return this.http.get(this.url + '/proctorproject/getallproctorsprojects', { params: data });
  }
}
