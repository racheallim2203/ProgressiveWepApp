import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-speech-bot',
  templateUrl: './speech-bot.component.html',
  styleUrls: ['./speech-bot.component.css']
})
export class SpeechBotComponent {
  textToSynthesize: string = '';

  constructor(private http: HttpClient) { }

  synthesizeSpeech() {
    if (this.textToSynthesize) {
      /*Creates a Blob from the response data, indicating it is of type 'audio/mpeg': new Blob([data], { type: 'audio/mpeg' })
      Converts the Blob into an object URL: URL.createObjectURL(blob) Creates a new Audio object with the object URL and plays it: new Audio(audioUrl).play() */
      
      this.http.post('http://localhost:8081/speech-bot/synthesize', { text: this.textToSynthesize }, { responseType: 'blob' })
        .subscribe(data => {
          const blob = new Blob([data], { type: 'audio/mpeg' });
          const audioUrl = URL.createObjectURL(blob);
          new Audio(audioUrl).play();
        });
    }
  }
}

