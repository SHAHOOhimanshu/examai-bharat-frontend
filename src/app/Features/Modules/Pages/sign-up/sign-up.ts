import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-SignUp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  signupForm!: FormGroup;
  submitted = false;
  isSubmitting = false;
  submitError = '';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],

        email: ['', [Validators.required, Validators.email]],

        phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        city: ['', Validators.required],
        state: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],

        confirmPassword: ['', Validators.required],
      },

      {
        validators: this.passwordMatchValidator,
      },
    );

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
  // PASSWORD VALIDATION
  // =========================

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;

    const confirmPassword = form.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    }

    return {
      passwordMismatch: true,
    };
  }

  get f() {
    return this.signupForm.controls;
  }

  // =========================
  // SUBMIT
  // =========================

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }
}
