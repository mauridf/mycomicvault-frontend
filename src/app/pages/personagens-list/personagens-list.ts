import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { Personagem, PersonagemService, PageResponse } from '../../services/personagem.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

declare var Math: any;

@Component({
  selector: 'app-personagens-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkWithHref, FormsModule, NgxPaginationModule, FontAwesomeModule],
  templateUrl: './personagens-list.html',
  styleUrls: ['./personagens-list.scss']
})
export class PersonagensListComponent implements OnInit {
  personagens: Personagem[] = [];
  pageResponse!: PageResponse<Personagem>;
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  searchTerm: string = '';

  // Ícones
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faSearch = faSearch;

  constructor(private personagemService: PersonagemService) {}

  ngOnInit(): void {
    this.carregarPersonagens();
  }

  carregarPersonagens() {
    this.personagemService.listar(this.currentPage, this.pageSize, 'name', this.searchTerm).subscribe({
      next: (response) => {
        this.personagens = response.content;
        this.totalItems = response.totalElements;
      },
      error: (err) => console.error(err),
    });
  }

  pageChanged(page: number) {
    this.currentPage = page - 1;
    this.carregarPersonagens();
  }

  pesquisar() {
    this.currentPage = 0;
    this.carregarPersonagens();
  }

  deletar(id?: string) {
    if (!id) return;
    if (confirm('Confirma exclusão do personagem?')) {
      this.personagemService.deletar(id).subscribe(() => {
        // Se deletamos o último item da página, voltamos uma página
        if (this.personagens.length === 1 && this.currentPage > 0) {
          this.currentPage--;
        }
        this.carregarPersonagens();
      });
    }
  }

  getItemInicio(): number {
    return (this.currentPage * this.pageSize) + 1;
  }

  getItemFim(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.totalItems);
  }
}
