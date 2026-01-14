import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaBoite } from './ma-boite';

describe('MaBoite', () => {
  let component: MaBoite;
  let fixture: ComponentFixture<MaBoite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaBoite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaBoite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
