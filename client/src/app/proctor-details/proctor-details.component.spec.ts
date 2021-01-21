import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProctorDetailsComponent } from './proctor-details.component';

describe('ProctorDetailsComponent', () => {
  let component: ProctorDetailsComponent;
  let fixture: ComponentFixture<ProctorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProctorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProctorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
