import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaSorteoComponent } from './galeria-sorteo.component';

describe('GaleriaSorteoComponent', () => {
  let component: GaleriaSorteoComponent;
  let fixture: ComponentFixture<GaleriaSorteoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleriaSorteoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GaleriaSorteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
