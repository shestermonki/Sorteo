import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditAdminComponent } from './new-edit-admin.component';

describe('NewEditAdminComponent', () => {
  let component: NewEditAdminComponent;
  let fixture: ComponentFixture<NewEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEditAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
