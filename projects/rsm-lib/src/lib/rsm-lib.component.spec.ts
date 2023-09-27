import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsmLibComponent } from './rsm-lib.component';

describe('RsmLibComponent', () => {
  let component: RsmLibComponent;
  let fixture: ComponentFixture<RsmLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsmLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsmLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
