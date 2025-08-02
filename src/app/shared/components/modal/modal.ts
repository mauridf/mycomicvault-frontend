import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div class="modal-backdrop" *ngIf="visible" [class.active]="visible">
      <div class="modal-container" [class.active]="visible">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close" (click)="onClose()" aria-label="Fechar">
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1050;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .modal-backdrop.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-container {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      transform: translateY(-20px);
      transition: all 0.3s ease;
      opacity: 0;
    }

    .modal-container.active {
      transform: translateY(0);
      opacity: 1;
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f8f9fa;
      border-radius: 12px 12px 0 0;
    }

    .modal-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: #343a40;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      color: #6c757d;
      transition: color 0.2s;
      padding: 0.5rem;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-close:hover {
      color: #495057;
      background-color: #e9ecef;
    }

    .modal-body {
      padding: 1.5rem;
    }

    /* Responsividade */
    @media (max-width: 768px) {
      .modal-container {
        width: 95%;
        max-height: 85vh;
      }
      
      .modal-header {
        padding: 1rem;
      }
      
      .modal-body {
        padding: 1rem;
      }
    }
  `]
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();
  faTimes = faTimes;

  onClose() {
    this.close.emit();
  }
}