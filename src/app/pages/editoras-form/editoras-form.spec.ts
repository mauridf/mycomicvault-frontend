import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorasForm } from './editoras-form';

describe('EditorasForm', () => {
  let component: EditorasForm;
  let fixture: ComponentFixture<EditorasForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorasForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorasForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
