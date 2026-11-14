import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntResComponent } from './int-res.component';

describe('IntResComponent', () => {
  let component: IntResComponent;
  let fixture: ComponentFixture<IntResComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntResComponent]
    });
    fixture = TestBed.createComponent(IntResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
