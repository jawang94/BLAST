import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadroomComponent } from './threadroom.component';

describe('ThreadroomComponent', () => {
  let component: ThreadroomComponent;
  let fixture: ComponentFixture<ThreadroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
