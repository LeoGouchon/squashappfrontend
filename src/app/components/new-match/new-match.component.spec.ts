import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMatchComponent } from './new-match.component';

describe('ChoosePlayerComponent', () => {
  let component: NewMatchComponent;
  let fixture: ComponentFixture<NewMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
