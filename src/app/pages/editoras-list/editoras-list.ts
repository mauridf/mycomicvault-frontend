import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { Editora, EditoraService, PageResponse } from '../../services/editora.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

declare var Math: any;

@Component({
  selector: 'app-editoras-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkWithHref, FormsModule, NgxPaginationModule, FontAwesomeModule],
  templateUrl: './editoras-list.html',
  styleUrls: ['./editoras-list.scss']
})
export class EditorasListComponent implements OnInit {
  editoras: Editora[] = [];
  pageResponse!: PageResponse<Editora>;
  currentPage: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  searchTerm: string = '';

  // Ícones
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faSearch = faSearch;

  constructor(private editoraService: EditoraService) {}

  ngOnInit(): void {
    this.carregarEditoras();
  }

  carregarEditoras() {
    this.editoraService.listar(this.currentPage, this.pageSize, 'name', this.searchTerm).subscribe({
      next: (response) => {
        this.editoras = response.content;
        this.totalItems = response.totalElements;
      },
      error: (err) => console.error(err),
    });
  }

  pageChanged(page: number) {
    this.currentPage = page - 1;
    this.carregarEditoras();
  }

  pesquisar() {
    this.currentPage = 0;
    this.carregarEditoras();
  }

  deletar(id?: string) {
    if (!id) return;
    if (confirm('Confirma exclusão da editora?')) {
      this.editoraService.deletar(id).subscribe(() => {
        // Se deletamos o último item da página, voltamos uma página
        if (this.editoras.length === 1 && this.currentPage > 0) {
          this.currentPage--;
        }
        this.carregarEditoras();
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
