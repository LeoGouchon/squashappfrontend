import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailedComponent } from './match-detailed.component';

describe('MatchDetailedComponent', () => {
  let component: MatchDetailedComponent;
  let fixture: ComponentFixture<MatchDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchDetailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
