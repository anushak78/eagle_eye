import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProctorBatchDetailService {

  constructor(private http:HttpClient) { }
  private url='/batch';
  proctorBatchDetail(projectId:String,proctorId:String):Observable<any>{
    return this.http.get<String>(this.url+`/details/${projectId}/${proctorId}`,  {headers: new HttpHeaders({'batch-list':'batchList request for proctor Id'+proctorId}) } )
  }

}
