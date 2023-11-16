import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-translation-bot',
  templateUrl: './translation-bot.component.html',
  styleUrls: ['./translation-bot.component.css']
})
export class TranslationBotComponent {
  translationText: string = '';
  translationLanguage: string = '';
  translationResult: string = ''; // Store the translation result

  constructor(private http: HttpClient) { }

  translateText() {
    if (this.translationText && this.translationLanguage) {
      this.http.post('http://localhost:8081/translation-bot/translate', {
        translationText: this.translationText,
        translationLanguage: this.translationLanguage
      }).subscribe((response: any) => {
        // Handle the response here
        this.translationResult = response.translatedText; // Adjust the property name based on the API response
      });
    }
  }
}
