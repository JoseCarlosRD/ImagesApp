import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerimagenesComponent } from './verimagenes.component';

describe('VerimagenesComponent', () => {
  let component: VerimagenesComponent;
  let fixture: ComponentFixture<VerimagenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerimagenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerimagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
