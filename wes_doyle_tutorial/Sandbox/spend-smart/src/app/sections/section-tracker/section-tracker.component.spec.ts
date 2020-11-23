import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTrackerComponent } from './section-tracker.component';

describe('SectionTrackerComponent', () => {
  let component: SectionTrackerComponent;
  let fixture: ComponentFixture<SectionTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
