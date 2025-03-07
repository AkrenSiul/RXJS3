
import { Component, inject } from '@angular/core';
import { ChatgptService } from '../../services/chatgpt.service';
import { NgClass, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [NgClass, FormsModule, NgForOf]
})
export class ChatComponent {
  private chatGpt: ChatgptService = inject(ChatgptService);
  messages: { role: string; content: string }[] = [
    { role: 'system', content: 'Eres un asistente útil.' },
  ];
  userInput = '';

  sendMessage() {
    if (this.userInput.trim() === '') return;

    this.messages.push({ role: 'user', content: this.userInput });

    this.chatGpt.sendMessage(this.messages).subscribe((response) => {
      const reply = response.choices[0].message.content;
      this.messages.push({ role: 'assistant', content: reply });
    });

    this.userInput = '';
  }
}
