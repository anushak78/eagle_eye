import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  curr_projects = ['Venue 1', 'Venue 2', 'Venue 3', 'Venue 4', 'Venue 5', 'Venue 6',
    'Venue 7', 'Venue 8', 'Venue 9', 'Venue 10', 'Venue 11', 'Venue 12',
    'Venue 13', 'Venue 14', 'Venue 15', 'Venue 16', 'Venue 17', 'Venue 18'];
  spliced_data = [];
  page_event = { pageIndex: 0, pageSize: 0 }

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.curr_projects.length <= 6) {
      this.spliced_data = this.curr_projects.slice(0).slice(0, 6);
    }
    else {
      this.spliced_data = this.curr_projects.slice(0).slice(0, 12);
    }
   /* this.moduleService.getModules().subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })*/
  }

  pageChangeEvent(event) {
    this.page_event.pageIndex = event.pageIndex
    this.page_event.pageSize = event.pageSize
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.spliced_data = this.curr_projects.slice(offset).slice(0, event.pageSize);
  }

  filterProjectName($event) {
    this.spliced_data = this.curr_projects.filter(s => s.includes($event.target.value))
    if (!$event.target.value) {
      console.log(this.page_event)
      const offset = ((this.page_event.pageIndex + 1) - 1) * this.page_event.pageSize;
      this.spliced_data = this.curr_projects.slice(offset).slice(0, this.page_event.pageSize);
    }
  }

  gotoPage(pageName: string, ele: string) {
    sessionStorage.setItem('name', ele)
    this.router.navigate([pageName])
  }

}
