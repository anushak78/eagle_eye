import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProctorDetailsService {
  private url = '/monitoring';
  constructor(private http: HttpClient) { }

  candidatePause(data: any): Observable<any> {
    return this.http.post<any>(this.url+`/pausecandidate/`,data);
  }

  candidateResume(data: any): Observable<any> {
    return this.http.post<any>(this.url+`/resumecandidate/`,data);
  }

  candidateStop(data: any): Observable<any> {
    return this.http.post<any>(this.url+`/stopcandidate/`,data);
  }
  candidateApprove(data: any): Observable<any> {
    return this.http.post<any>(this.url+`/approvecandidate/`,data);
  }
}