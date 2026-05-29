import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TranslatePipe } from '../../core/pipes/translate/translate.pipe';
import { TranslationService } from '../../core/services/translation.service';
import { Lang } from '../../core/types/lang.types';

import emailjs from '@emailjs/browser';

interface CarouselImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-page-comming-soon',
  standalone: true,
  templateUrl: './page-comming-soon.component.html',
  styleUrl: './page-comming-soon.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    ButtonModule,
    InputTextModule,
    NgOptimizedImage,
    TranslatePipe
  ]
})
export class PageCommingSoonComponent {

  private translation = inject(TranslationService);

  // ✅ signal langue globale
  lang = this.translation.lang;

  email = signal<string>('');

  images: CarouselImage[] = [
    { src: '/images/coming-soon/ngog-litouba.webp', alt: 'Slide 1' },
    { src: '/images/coming-soon/plaine-arbres.webp', alt: 'Slide 2' },
    { src: '/images/coming-soon/sans-baobab.webp', alt: 'Slide 3' },
    { src: '/images/coming-soon/baobab.webp', alt: 'Slide 4' }
  ];

  setLang(lang: Lang) {
    this.translation.setLang(lang);
  }

  async onSubmit() {

    if (!this.email()) {
      alert('Veuillez saisir un email');
      return;
    }

    try {

      const templateParams = {
        user_email: this.email(),
      };

      await emailjs.send(
        'service_u2g186v',
        'template_6dicgf8',
        templateParams,
        'GKSiP00wY0iVhdYw5'
      );

      alert('Email envoyé ✅');
    } catch (error) {
      console.error(error);
      alert('Erreur ❌');
    }
  }

  async getBase64(filePath: string): Promise<string> {
    const response = await fetch(filePath);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  updateEmail(value: string) {
    this.email.set(value);
  }

  scrollToContent() {
    document.getElementById('content')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}