import { ModalComponent } from '../../shared/components/modal/modal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editora, EditoraService, ComicVinePublisher } from '../../services/editora.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TruncatePipe } from '../../pipes/pipe-transform';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editoras-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    FontAwesomeModule, 
    TruncatePipe,
    ModalComponent,
    FormsModule
  ],
  templateUrl: './editoras-form.html',
  styleUrls: ['./editoras-form.scss']
})
export class EditorasFormComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    aliases: new FormControl('', [Validators.maxLength(65535)]),
    deck: new FormControl('', [Validators.maxLength(65535)]),
    idComicVinePublisher: new FormControl<number | null>(null),
    logotipoMediumUrl: new FormControl(''),
    logotipoSmallUrl: new FormControl(''),
    logotipoTinyUrl: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    name: new FormControl('', Validators.required),
    siteDetailUrl: new FormControl(''),
  });

  comicVineResults: ComicVinePublisher[] = [];
  searchTerm: string = '';
  isLoading = false;
  showComicVineModal = false;
  
  // Ícones
  faSearch = faSearch;
  faTimes = faTimes;

  constructor(
    private editoraService: EditoraService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editoraService.buscarPorId(id).subscribe({
        next: (editora) => this.preencheFormulario(editora),
        error: (err) => console.error(err),
      });
    }
  }

  preencheFormulario(editora: Editora) {
    this.form.patchValue({
      id: editora.id ?? undefined,
      aliases: editora.aliases ?? '',
      deck: editora.deck ?? '',
      idComicVinePublisher: editora.idComicVinePublisher ?? null,
      logotipoMediumUrl: editora.logotipoMediumUrl ?? '',
      logotipoSmallUrl: editora.logotipoSmallUrl ?? '',
      logotipoTinyUrl: editora.logotipoTinyUrl ?? '',
      address: editora.address ?? '',
      city: editora.city ?? '',
      state: editora.state ?? '',
      name: editora.name ?? '',
      siteDetailUrl: editora.siteDetailUrl ?? '',
    });
  }

  buscarNaComicVine() {
    if (!this.searchTerm.trim()) {
      this.showComicVineModal = true; // Mostra o modal mesmo sem termo para feedback
      return;
    }
    
    this.isLoading = true;
    this.editoraService.buscarNaComicVine(this.searchTerm).subscribe({
      next: (response) => {
        this.comicVineResults = response.results;
        this.showComicVineModal = true; // Garante que o modal será aberto
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.showComicVineModal = true; // Mostra o modal mesmo em caso de erro
      },
      complete: () => {
        this.isLoading = false;
        if (this.comicVineResults.length === 0) {
          this.showComicVineModal = true; // Mostra o modal mesmo sem resultados
        }
      }
    });
  }

  selecionarEditora(editora: ComicVinePublisher) {
    this.form.patchValue({
      name: editora.name,
      aliases: editora.aliases,
      deck: editora.deck,
      idComicVinePublisher: editora.id,
      logotipoMediumUrl: editora.image?.medium_url,
      logotipoSmallUrl: editora.image?.small_url,
      logotipoTinyUrl: editora.image?.tiny_url,
      address: editora.location_address,
      city: editora.location_city,
      state: editora.location_state,
      siteDetailUrl: editora.site_detail_url
    });
    this.showComicVineModal = false;
  }

  salvar() {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const editora: Editora = {
      ...formValue,
      aliases: formValue.aliases?.substring(0, 65535), // Garante que não exceda
      deck: formValue.deck?.substring(0, 65535), // Garante que não exceda
      id: formValue.id ?? undefined,
    } as Editora;

    if (editora.id) {
      this.editoraService.atualizar(editora.id, editora).subscribe({
        next: () => this.voltar(),
        error: (err) => console.error('Erro ao atualizar:', err)
      });
    } else {
      this.editoraService.criar(editora).subscribe({
        next: () => this.voltar(),
        error: (err) => console.error('Erro ao criar:', err)
      });
    }
  }

  voltar() {
    this.router.navigate(['/editoras']);
  }
}