import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorasListComponent } from './editoras-list';

describe('EditorasList', () => {
  let component: EditorasListComponent;
  let fixture: ComponentFixture<EditorasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
