import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPlayerComponent } from './link-player.component';

describe('LinkPlayerComponent', () => {
  let component: LinkPlayerComponent;
  let fixture: ComponentFixture<LinkPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
