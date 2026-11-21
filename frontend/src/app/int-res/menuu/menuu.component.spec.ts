import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuuComponent } from './menuu.component';

describe('MenuuComponent', () => {
  let component: MenuuComponent;
  let fixture: ComponentFixture<MenuuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuuComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
