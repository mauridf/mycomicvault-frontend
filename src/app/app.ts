import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header';
import { MenuLateralComponent } from './core/menu-lateral/menu-lateral';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent, 
    MenuLateralComponent, 
    RouterOutlet, 
    CommonModule, 
    FontAwesomeModule,
    NgxPaginationModule,
    FormsModule],
  template: `
    <app-header (toggleMenu)="toggleMenu()"></app-header>
    <div class="d-flex">
      <app-menu-lateral *ngIf="menuAberto"></app-menu-lateral>
      <main class="flex-grow-1 p-3">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: #f8f9fa;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    main {
      flex-grow: 1;
      min-height: 100%;
      background-color: #ffffff;
      padding: 1rem;
      overflow-y: auto;
    }

    .d-flex {
      flex: 1;
      display: flex;
      flex-direction: row;
    }
  `]
})
export class AppComponent {
  menuAberto = window.innerWidth > 768;

  ngOnInit() {
    window.addEventListener('resize', () => {
      this.menuAberto = window.innerWidth > 768;
    });
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
}
