import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }
  private url = '/candidate';
  private fetchCandidateData: any = [];
  fetchCandidateDetails(projectId: String, proctorId: String, batchId: String): Observable<any> {
    return this.http.get(this.url + `/viewCandidateList/${projectId}/${proctorId}/${batchId}`, { headers: new HttpHeaders({ 'candidate-list': 'candidateList request for batch Id' + batchId }) })
  }

  fetchCandidateLogs(candidateUsername): Observable<any> {
    debugger;
    return this.http.get(this.url + `/fetchCandidateLogs/${candidateUsername}`, { observe: 'response' })
      .pipe(map((res: any) => {
        console.log(res);
        debugger;
        return res.body;
      }));
  }
}