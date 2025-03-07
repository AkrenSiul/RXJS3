
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {
  private readonly http: HttpClient = inject(HttpClient);
  private apiUrl = '/openai/chat/completions';
  private apiKey = environment.openaiApiKey;

  sendMessage(messages: { role: string; content: string }[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: messages,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
