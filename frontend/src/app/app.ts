import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly http = inject(HttpClient);
  protected readonly greeting = signal('Loading greeting…');
  protected readonly loading = signal(true);

  constructor() {
    this.loadGreeting();
  }

  protected loadGreeting(): void {
    this.loading.set(true);
    this.http.get<{ message: string }>('/api/hello').subscribe({
      next: ({ message }) => {
        this.greeting.set(message);
        this.loading.set(false);
      },
      error: () => {
        this.greeting.set('Unable to connect to the Node.js API.');
        this.loading.set(false);
      },
    });
  }
}
