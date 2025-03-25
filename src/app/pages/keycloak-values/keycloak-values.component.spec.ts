import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeycloakValuesComponent } from './keycloak-values.component';

describe('KeycloakValuesComponent', () => {
  let component: KeycloakValuesComponent;
  let fixture: ComponentFixture<KeycloakValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeycloakValuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeycloakValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
