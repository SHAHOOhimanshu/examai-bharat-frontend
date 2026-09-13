import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [MatIconModule, CommonModule , RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

  slides = [
    {
      number: '01',
      title: 'Choose Your Exam',
      description: 'Select the competitive exam you are preparing for and start your personalized preparation journey with ExamAI Bharat.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    },
    {
      number: '02',
      title: 'Practice Your Way',
      description: 'Practice with PYQs, AI-generated questions, hybrid practice, subject tests, topic tests, and mock tests.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1600&q=80',
    },
    {
      number: '03',
      title: 'Learn & Improve',
      description: 'Get AI-Powered explanations, solve doubts, identify weak topics, and understand where you need to improve.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80',
    },
    {
      number: '04',
      title: 'Track Your Progress',
      description: 'Analyze your performance, track your progress, and focus your preparation on the areas that need more attention.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    }
  ];

  currentSlide = 0;

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}