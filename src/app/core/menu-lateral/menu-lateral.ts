import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="menu-lateral bg-light vh-100 p-3">
      <ul class="nav flex-column">
        <li class="nav-item" *ngFor="let item of menuItems">
          <a [routerLink]="item.path" routerLinkActive="active" class="nav-link d-flex align-items-center gap-2">
            <i class="{{ item.icon }}"></i>
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

  `,
  styles: [`
  .menu-lateral {
    width: 250px;
    background-color: #f1f3f5;
    border-right: 1px solid #dee2e6;
  }

  .nav-link {
    color: #495057;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .nav-link:hover {
    background-color: #dee2e6;
  }

  .nav-link.active {
    font-weight: bold;
    background-color: #e7f1ff;
    color: #0d6efd;
  }

  .nav-item + .nav-item {
    margin-top: 4px;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #495057;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .nav-link i {
    font-size: 1.2rem;
  }

  .nav-link:hover {
    background-color: #dee2e6;
  }

`]

})
export class MenuLateralComponent {
  menuItems = [
    { label: 'Home', path: '/', icon: 'bi-house' },
    { label: 'Editoras', path: '/editoras', icon: 'bi-building' },
    { label: 'Personagens', path: '/personagens', icon: 'bi-person-lines-fill' },
    { label: 'Equipes', path: '/equipes', icon: 'bi-people-fill' },
    { label: 'HQs', path: '/hqs', icon: 'bi-journal-bookmark-fill' },
    { label: 'Edições', path: '/edicoes', icon: 'bi-collection-play' }
  ];
}
