import { Component } from '@angular/core';
import { PageCommingSoonComponent } from './pages/page-comming-soon/page-comming-soon.component';

/*
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    PageCommingSoonComponent
  ]
})

export class AppComponent {
  title = 'fe-mahol-public';
}
