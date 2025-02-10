import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareWorkspaceComponent } from './share-workspace.component';

describe('ShareWorkspaceComponent', () => {
  let component: ShareWorkspaceComponent;
  let fixture: ComponentFixture<ShareWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareWorkspaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
