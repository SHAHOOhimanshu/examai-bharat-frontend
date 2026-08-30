import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { email, form, FormField, minLength, pattern, required, validate } from '@angular/forms/signals';

@Component({
  selector: 'app-SignUp',
  standalone: true,
  imports: [CommonModule, RouterLink,FormField],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  submitted = signal(false);
  isSubmitting = signal(false);
  submitError = signal('');
  currentIndex = signal(0);

  private autoplayId: ReturnType<typeof setInterval> | null = null;

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

  signupModel = signal({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: '',
  });
  signupForm = form(this.signupModel, (schema) => {
    required(schema.fullName);
    minLength(schema.fullName, 3);

    required(schema.email);
    email(schema.email);

    required(schema.phone);
    pattern(schema.phone, /^[6-9]\d{9}$/);

    required(schema.city);
    required(schema.state);

    required(schema.password);
    minLength(schema.password, 8);

    required(schema.confirmPassword);

    validate(schema.confirmPassword, (passMatch) => {
      const password = passMatch.valueOf(schema.password);
      const confirmPassword = passMatch.valueOf(schema.confirmPassword);
      if (password !== confirmPassword) {
        return { kind: 'passwordMismatch', message: 'passwords do not match' };
      }
      return null;
    });
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
    this.autoplayId = setInterval(() => {
      this.next();
    }, 3000);
  }

  pauseAutoplay(): void {
    this.stopAutoplay();
  }

  stopAutoplay(): void {
    if (this.autoplayId !== null) {
      clearInterval(this.autoplayId);

      this.autoplayId = null;
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

  // =========================
  // SUBMIT
  // =========================

  onSubmit(): void {
    this.submitted.set(true);

    if (this.signupForm().invalid()) {
      this.signupForm().markAsTouched();
      return;
    }
    this.isSubmitting.set(true);
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }
}
