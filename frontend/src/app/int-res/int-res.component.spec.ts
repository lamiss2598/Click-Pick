import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { IntResComponent } from './int-res.component';

describe('IntResComponent', () => {
  let component: IntResComponent;
  let fixture: ComponentFixture<IntResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntResComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IntResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
