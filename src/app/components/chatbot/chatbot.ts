import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css'],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class Chatbot implements OnInit {
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  userInput: string = '';
  isOpen = false; // Controls chat panel visibility

  ngOnInit() {
    this.addBotMessage("👋 Hi! I'm your productivity assistant. Ask me about timers, focus tips, or breaks!");
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => {
        this.scrollToBottom();
      }, 300);
    }
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = this.userInput.trim();
    this.messages.push({ text: userMessage, sender: 'user' });
    this.userInput = '';

    // Bot response after 500ms
    setTimeout(() => {
      this.addBotMessage(this.getBotResponse(userMessage));
      this.scrollToBottom();
    }, 500);
  }

  addBotMessage(text: string) {
    this.messages.push({ text, sender: 'bot' });
  }

  getBotResponse(input: string): string {
    const lower = input.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) {
      return "Hello! 😊 How’s your focus session going?";
    } else if (lower.includes('timer') || lower.includes('time')) {
      return "You can set your focus timer above. Default is 60 minutes — perfect for deep work!";
    } else if (lower.includes('break') || lower.includes('rest')) {
      return "After your timer ends, take a 5-10 min break. Your brain will thank you! 🧠💤";
    } else if (lower.includes('help')) {
      return "Try asking about: timers, breaks, Pomodoro, or focus tips!";
    } else if (lower.includes('bye') || lower.includes('close')) {
      return "Goodbye! Come back when you need focus help. 🚀";
    } else {
      return "I’m still learning! Try asking about timers, breaks, or productivity tips.";
    }
  }

  getTimestamp(index: number): string {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  }

  private scrollToBottom() {
    const container = document.querySelector('.chat-messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
}