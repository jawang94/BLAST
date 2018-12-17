import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedthreadsComponent } from './joinedthreads.component';

describe('JoinedthreadsComponent', () => {
  let component: JoinedthreadsComponent;
  let fixture: ComponentFixture<JoinedthreadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedthreadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedthreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
