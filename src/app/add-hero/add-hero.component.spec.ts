import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroComponent } from './add-hero.component';

describe('AddHeroComponent', () => {
  let component: AddHeroComponent;
  let fixture: ComponentFixture<AddHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
