import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationBotComponent } from './translation-bot.component';

describe('TranslationBotComponent', () => {
  let component: TranslationBotComponent;
  let fixture: ComponentFixture<TranslationBotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationBotComponent]
    });
    fixture = TestBed.createComponent(TranslationBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
