import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonagensListComponent } from './personagens-list';

describe('PersonagensList', () => {
  let component: PersonagensListComponent;
  let fixture: ComponentFixture<PersonagensListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonagensListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonagensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
