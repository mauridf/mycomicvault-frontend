import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header d-flex justify-content-between align-items-center px-3 py-2 bg-primary text-white">
      <button class="btn btn-sm btn-light" (click)="toggleMenu.emit()">☰</button>
      <h1 class="mb-0">MyComicVault</h1>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <!-- breadcrumbs dinâmicos poderão ser implementados -->
          <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
        </ol>
      </nav>
    </header>
  `,
  styles: [`
  .header {
    height: 60px;
    background-color: #0d6efd;
    color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .breadcrumb {
    background-color: transparent;
    margin-bottom: 0;
  }

  .breadcrumb a {
    color: #cce5ff;
    text-decoration: none;
  }

  .breadcrumb .active {
    color: #ffffff;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0;
  }

  button {
    border: none;
    background: #ffffff;
    color: #0d6efd;
    font-weight: bold;
  }

  button:hover {
    background: #e2e6ea;
  }
`]

})
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter<void>();
}
