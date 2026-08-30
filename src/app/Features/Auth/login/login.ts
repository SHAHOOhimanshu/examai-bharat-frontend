import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterLink, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  submitted = signal(false);
  isSubmitting = signal(false);
  submitError = signal('');
  currentIndex = signal(0);
  showPassword = signal(false);
  private autoPlayId: ReturnType<typeof setInterval> | null = null;
  private touchStartX = 0;
  private touchEndX = 0;
  slides = [
    {
      image: 'images/illustration-1.png',
      alt: 'People working on laptops with dashboards',
      title: 'Manage your courses in one place',
      description: 'Track lessons, tests and progress from a single dashboard',
    },

    {
      image: 'images/illustration-2.png',
      alt: 'Student learning at a computer',
      title: 'Login to access the courses and materials',
      description: 'Create account and access the courses, tests and study materials',
    },

    {
      image: 'images/illustration-3.png',
      alt: 'Student studying on a laptop',
      title: 'Learn anywhere, at your pace',
      description: 'Pick up right where you left off, on any device',
    },
  ];
  loginModel = signal({
    emailOrPhone: '',
    password: '',
  });
  loginForm = form(this.loginModel, (schema) => {
    required(schema.emailOrPhone);
    // email(schema.emailOrPhone);
    validate(schema.emailOrPhone, (EOP) => {
      const value = EOP.valueOf(schema.emailOrPhone);
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const validPhone = /^[6-9]\d{9}$/.test(value);
      if (!validEmail && !validPhone) {
        return {
          kind: 'invalidEmailOrPhone',
          message: 'Enter a valid email or 10-digit phone number',
        };
      }
      return null;
    });

    required(schema.password);
    minLength(schema.password, 8);
  });
  ngOnInit(): void {
    this.startAutoplay();
  }
  // =========================
  // SLIDER
  // =========================
  next(): void {
    this.currentIndex.update((i) => (i + 1) % this.slides.length);
  }
  previous(): void {
    this.currentIndex.update((i) => (i - 1 + this.slides.length) % this.slides.length);
  }
  goToSlide(index: number): void {
    this.currentIndex.set(index);
    this.startAutoplay();
  }
  // =========================
  // AUTOPLAY
  // =========================

  startAutoplay(): void {
    this.stopAutoplay();
    this.autoPlayId = setInterval(() => {
      this.next();
    }, 3000);
  }
  pauseAutoplay(): void {
    if (this.autoPlayId !== null) {
      clearInterval(this.autoPlayId);
      this.autoPlayId = null;
    }
  }
  stopAutoplay(): void {
    if (this.autoPlayId !== null) {
      clearInterval(this.autoPlayId);

      this.autoPlayId = null;
    }
  }
  // =========================
  // TOUCH / SWIPE
  // =========================
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    const difference = this.touchStartX - this.touchEndX;

    // Ignore very small movement
    if (Math.abs(difference) < 50) {
      return;
    }
    // Swipe left
    if (difference > 0) {
      this.next();
    }
    // Swipe right
    else {
      this.previous();
    }
  }
  togglePassword(): void {
    this.showPassword.update((value) => !value);
  }
  onSubmit(): void {
    this.submitted.set(true);
    if (this.loginForm().invalid()) {
      this.loginForm().markAsTouched();
      return;
    }
    this.isSubmitting.set(true);
  }
  ngOnDestroy(): void {
    this.stopAutoplay();
  }
}
