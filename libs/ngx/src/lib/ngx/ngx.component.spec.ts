import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxComponent } from './ngx.component';

describe('NgxComponent', () => {
  let component: NgxComponent;
  let fixture: ComponentFixture<NgxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
