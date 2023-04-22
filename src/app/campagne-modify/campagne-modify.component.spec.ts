import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampagneModifyComponent } from './campagne-modify.component';

describe('CampagneModifyComponent', () => {
  let component: CampagneModifyComponent;
  let fixture: ComponentFixture<CampagneModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampagneModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampagneModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
