import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryLogComponent } from './memory-log.component';

describe('MemoryLogComponent', () => {
  let component: MemoryLogComponent;
  let fixture: ComponentFixture<MemoryLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
