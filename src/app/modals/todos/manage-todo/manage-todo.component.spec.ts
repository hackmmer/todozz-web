import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTodoComponent } from './manage-todo.component';

describe('ManageTodoComponent', () => {
  let component: ManageTodoComponent;
  let fixture: ComponentFixture<ManageTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageTodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
