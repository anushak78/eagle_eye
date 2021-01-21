import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild, HostListener, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { CandidateService } from '../service/candidate/candidate.service';
import { ChatTemplateComponent } from '../chat-template/chat-template.component';
import { ProctorDetailsService } from '../service/proctor-details/proctor-details.service';
 
@Component({
  selector: 'app-proctor-details',
  templateUrl: './proctor-details.component.html',
  styleUrls: ['./proctor-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProctorDetailsComponent implements OnInit {

  candidates = []
  selectedCandidate = {}
  currentUser : string;
  candidateLogs : string;
  view = 'tiled'
  breakpoint = 3
  photoOpen = false
  logsOpen = false
  zenchecked = false
  name: String;
  constructor(private dialog: MatDialog,
    private candidateService : CandidateService,
    private proctorDetailsService: ProctorDetailsService,
    private toastr:ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.candidates = [
      { name: 'A', msg: 'Pending', selected: true, flag: true, pause: false, pause_reason: '' },
      { name: 'B', msg: 'Approved', selected: false, flag: true, pause: false, pause_reason: '' },
      { name: 'C', msg: 'Pending', selected: false, flag: false, pause: false, pause_reason: '' },
      { name: 'D', msg: 'Approved', selected: false, flag: false, pause: false, pause_reason: '' },
      { name: 'E', msg: 'Pending', selected: false, flag: true, pause: false, pause_reason: '' },
      { name: 'F', msg: 'Approved', selected: false, flag: false, pause: false, pause_reason: '' },
    ]
   /* this.candidateService.fetchCandidateDetails(sessionStorage.getItem('projectid').toString(),sessionStorage.getItem('proctorid').toString(),sessionStorage.getItem('batch_id').toString()).subscribe(list=>{
      if(list.success){
        this.candidates=list.payload;
        this.selectedCandidate = this.candidates[0]
        this.breakpoint = this.candidates.length / 2
        if (this.breakpoint > 4) {
          this.breakpoint = 4
        }
        if (this.breakpoint == 1) {
          if (this.candidates.length == 2)
            this.breakpoint = 2
        }
      }else{
        this.toastr.error(list.msg);
      }
    });*/
    this.name = sessionStorage.getItem('name')
    this.selectedCandidate = this.candidates[0]
  }
  
  // keyboard shortcuts
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == 27) {
      this.zenchecked = false
    }
    if (this.view != 'tiled') {
      if (event.shiftKey && event.key === "C") {
        this.openChat();
      }
      if (event.shiftKey && event.key === "P") {
        //pause video function
      }
      if (event.shiftKey && event.key === "R") {
        //resume video function
      }
      if (event.shiftKey && event.key === "S") {
        //sound function
      }
      if (event.shiftKey && event.key === "L") {
        this.openLogs('logs')
      }
    }
  }

  @ViewChild(ChatTemplateComponent) chatTemplate;
  openChat() {
    this.chatTemplate.openChat({username: this.selectedCandidate['name']})
    if (this.view == 'tiled') {
      this.view = 'sidebar'
    }
  }

  openChatBroadCast() {
    this.chatTemplate.openChat({username: 'broadcast'})
  }


  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, { disableClose: true })
  }

  setSelectedCandidate(index) {
    for (let i in this.candidates)
      this.candidates[i].selected = false
    this.candidates[index].selected = true
    this.selectedCandidate = this.candidates[index]
  }

  changeView(view_name: string) {
    this.view = view_name
    this.dialog.closeAll()
  }

  tileElementClicked(index) {
    this.view = 'sidebar'
    this.setSelectedCandidate(index)
  }

  goto(page: string) {
    this.router.navigate([page])
  }

  openPending(element: string) {
    if (element == 'photo') {
      this.photoOpen = true
    }
    if (element == 'close') {
      this.photoOpen = false
    }
  }

  openLogs(element: string) {
    debugger;
    
    console.log(this.selectedCandidate);
    this.currentUser = "Default "+this.selectedCandidate['name'];
    console.log(this.currentUser);
    this.candidateService.fetchCandidateLogs(this.currentUser).subscribe(
      fetchedLogs => {
        this.candidateLogs = fetchedLogs['payload'];
        console.log(this.candidateLogs);
      }
    );
    if (element == 'logs') {
      this.logsOpen = true
    }
    if (element == 'close') {
      this.logsOpen = false
    }
    if (this.view == 'tiled') {
      this.view = 'sidebar'
    }
  }

  pauseClicked(templateRef: TemplateRef<any>) {
    this.proctorDetailsService.candidatePause({userId:this.selectedCandidate['user_id']}).subscribe(paused=>{
      if(paused.success){
        this.selectedCandidate['pause'] = !this.selectedCandidate['pause']
        if (this.view == 'tiled') {
          this.view = 'sidebar'
        }
        if (this.selectedCandidate['pause']) {
          this.dialog.open(templateRef, { disableClose: true })
        }
      }else{
        this.toastr.error(paused.msg)
      }
    });
    
  }

  zenMode() {
    this.dialog.closeAll()
  }

  pauseMessageSaved() {
    this.dialog.closeAll()
  }
}