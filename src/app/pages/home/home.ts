import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="container mt-4">
      <h2>Dashboard - MyComicVault</h2>
      <p>Bem-vindo ao sistema de gestão da sua coleção de quadrinhos!</p>
      <p>Aqui futuramente teremos gráficos, resumos e informações importantes.</p>
    </div>
  `
})
export class HomeComponent {}
