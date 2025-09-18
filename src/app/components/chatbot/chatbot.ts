import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class Chatbot implements OnInit, OnDestroy {
  messages: { text: string; sender: 'user' | 'bot'; timestamp?: string }[] = [];
  userInput: string = '';
  isOpen = false;
  isTyping = false;
  lastUserMessage: string = ''; // Basic context memory

  // Quick reply suggestions (optional UI feature)
  quickReplies = [
    "Set a 25 min timer",
    "Tell me a focus tip",
    "Motivate me!",
    "What is Pomodoro?",
    "Fun fact please"
  ];

  ngOnInit() {
    const savedMessages = localStorage.getItem('chatbotMessages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    } else {
      this.addBotMessage("👋 Hi there! I'm FocusBot, your AI productivity pal. Ask me about timers, breaks, Pomodoro, focus hacks, or just say hi!");
    }
  }

  ngOnDestroy() {
    // Optional: Save chat on component destroy
    localStorage.setItem('chatbotMessages', JSON.stringify(this.messages));
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
    this.lastUserMessage = userMessage; // Store for context

    this.messages.push({
      text: userMessage,
      sender: 'user',
      timestamp: this.getTimestamp()
    });
    this.userInput = '';

    this.isTyping = true;

    // Simulate bot "typing"
    setTimeout(() => {
      this.isTyping = false;
      this.addBotMessage(this.getBotResponse(userMessage));
      this.scrollToBottom();
    }, 1200); // Slightly longer for realism
  }

  addBotMessage(text: string) {
    this.messages.push({
      text,
      sender: 'bot',
      timestamp: this.getTimestamp()
    });

    // Optional: Auto-save to localStorage
    localStorage.setItem('chatbotMessages', JSON.stringify(this.messages));
  }

  getBotResponse(input: string): string {
    const lower = input.toLowerCase();

    // Greetings
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      const greetings = [
        "Hey there! 😊 Ready to crush your goals today?",
        "Hi! What’s on your focus agenda?",
        "Hello, productivity warrior! 💪 How can I help?",
        "Hey! Need a boost or a break tip?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Timer / Pomodoro
    if (lower.includes('timer') || lower.includes('pomodoro') || lower.includes('25 min')) {
      return "🍅 The Pomodoro Technique: Work 25 min → 5 min break. Repeat 4x → take 15-30 min break. Want me to set one?";
    }

    // Breaks / Rest
    if (lower.includes('break') || lower.includes('rest') || lower.includes('pause')) {
      const breakTips = [
        "🧠 Pro tip: Stand up, stretch, and look away from screens for 2 mins — your eyes & spine will thank you!",
        "💧 Hydrate during breaks! Dehydration = brain fog.",
        "🚶‍♂️ Walk around for 5 mins — boosts creativity & circulation!",
        "🧘 Try 1 min of deep breathing. Inhale 4s, hold 4s, exhale 6s. Calms the nervous system!"
      ];
      return breakTips[Math.floor(Math.random() * breakTips.length)];
    }

    // Focus / Productivity Tips
    if (lower.includes('focus') || lower.includes('concentrate') || lower.includes('distract')) {
      const focusTips = [
        "📵 Put your phone in another room. Out of sight = out of mind.",
        "🎧 Try ambient noise or lo-fi beats — many find it helps flow state.",
        "📝 Write down distracting thoughts on a notepad to revisit later.",
        "🎯 Use the “2-minute rule”: If it takes <2 mins, do it NOW. Clears mental clutter."
      ];
      return focusTips[Math.floor(Math.random() * focusTips.length)];
    }

    // Motivation / Encouragement
    if (lower.includes('motivate') || lower.includes('encourage') || lower.includes('tired')) {
      const quotes = [
        "“You don’t have to be great to start, but you have to start to be great.” – Zig Ziglar 💪",
        "Progress > perfection. Keep going! 🚀",
        "Even 5 minutes of focused work counts. Start small, win big.",
        "Your future self is begging you to start now. 😊⏳"
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    }

    // Fun Facts
    if (lower.includes('fun fact') || lower.includes('did you know')) {
      const facts = [
        "🧠 Your brain’s optimal focus window is ~90 minutes — then it needs a break!",
        "⏱️ The average person gets distracted every 40 seconds while working on a screen!",
        "🌿 Plants in your workspace can boost productivity by 15%!",
        "🎵 Listening to music without lyrics improves concentration for most people."
      ];
      return facts[Math.floor(Math.random() * facts.length)];
    }

    // Help / Commands
    if (lower.includes('help') || lower.includes('command') || lower.includes('what can you do')) {
      return "Try asking me:\n" +
             "• “Set a timer” or “Pomodoro”\n" +
             "• “Focus tips” or “How to concentrate”\n" +
             "• “Motivate me” or “I’m tired”\n" +
             "• “Fun fact” or “Did you know”\n" +
             "• “Break ideas” or “Rest tips”\n" +
             "Or just chat with me! 😊";
    }

    // Clear chat
    if (lower.includes('clear chat') || lower.includes('reset')) {
      this.messages = [];
      return "🧹 Chat history cleared! Fresh start. What’s your next goal?";
    }

    // Bye / Close
    if (lower.includes('bye') || lower.includes('goodbye') || lower.includes('close')) {
      return "🌟 You’ve got this! Come back anytime. Remember: Small steps > no steps. Bye for now! 👋";
    }

    // Fallback with context hint
    if (this.lastUserMessage.toLowerCase().includes('timer') && lower.includes('how')) {
      return "You can set a custom timer using the controls above, or try the Pomodoro preset (25 min work / 5 min break).";
    }

    // Default fallback
    const fallbacks = [
      "Hmm, not sure I got that. Try asking about timers, focus, breaks, or motivation!",
      "I’m still learning! Ask me about Pomodoro, productivity hacks, or fun facts.",
      "🤔 Could you rephrase? I’m great with questions about focus, breaks, or motivation!"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  getTimestamp(): string {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  }

  private scrollToBottom() {
    setTimeout(() => {
      const container = document.querySelector('.chat-messages');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100); // Small delay to ensure DOM update
  }

  // Optional: Quick reply handler (bind in HTML)
  sendQuickReply(reply: string) {
    this.userInput = reply;
    this.sendMessage();
  }

  // Optional: Export chat (for user)
  exportChat() {
    const chatText = this.messages.map(m => `${m.sender.toUpperCase()} [${m.timestamp}]: ${m.text}`).join('\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'focusbot-chat.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}