import { ModalComponent } from '../../shared/components/modal/modal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Personagem, PersonagemService, ComicVinePublisher } from '../../services/personagem.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TruncatePipe } from '../../pipes/pipe-transform';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personagens-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    FontAwesomeModule, 
    TruncatePipe,
    ModalComponent,
    FormsModule
  ],
  templateUrl: './personagens-form.html',
  styleUrls: ['./personagens-form.scss']
})
export class PersonagensFormComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl<string | undefined>(undefined),
    aliases: new FormControl('', [Validators.maxLength(65535)]),
    birth: new FormControl(''),
    countOfIssueAppearances: new FormControl<number | null>(null),
    deck: new FormControl('', [Validators.maxLength(65535)]),
    idComicVineCharacter: new FormControl<number | null>(null),
    firstAppearedName: new FormControl(''),
    firstAppearedIssueNumber: new FormControl(''),
    gender: new FormControl(''),
    imagemMediumUrl: new FormControl(''),
    imagemSmallUrl: new FormControl(''),
    imagemTinyUrl: new FormControl(''),
    name: new FormControl('', Validators.required),
    originName: new FormControl(''),
    realName: new FormControl(''),
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
    private personagemService: PersonagemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.personagemService.buscarPorId(id).subscribe({
        next: (personagem) => this.preencheFormulario(personagem),
        error: (err) => console.error(err),
      });
    }
  }

  preencheFormulario(personagem: Personagem) {
    this.form.patchValue({
      id: personagem.id ?? undefined,
      aliases: personagem.aliases ?? '',
      birth: personagem.birth ?? '',
      countOfIssueAppearances: personagem.countOfIssueAppearances ?? null,
      deck: personagem.deck ?? '',
      idComicVineCharacter: personagem.idComicVineCharacter ?? null,
      firstAppearedName: personagem.firstAppearedName ?? '',
      firstAppearedIssueNumber: personagem.firstAppearedIssueNumber ?? '',
      gender: personagem.gender ?? '',
      imagemMediumUrl: personagem.imagemMediumUrl ?? '',
      imagemSmallUrl: personagem.imagemSmallUrl ?? '',
      imagemTinyUrl: personagem.imagemTinyUrl ?? '',
      name: personagem.name ?? '',
      originName: personagem.originName ?? '',
      realName: personagem.realName ?? '',
      siteDetailUrl: personagem.siteDetailUrl ?? '',
    });
  }

  buscarNaComicVine() {
    if (!this.searchTerm.trim()) {
      this.showComicVineModal = true; // Mostra o modal mesmo sem termo para feedback
      return;
    }
    
    this.isLoading = true;
    this.personagemService.buscarNaComicVine(this.searchTerm).subscribe({
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

  selecionarPersonagem(personagem: ComicVinePublisher) {
    this.form.patchValue({
      name: personagem.name,
      aliases: personagem.aliases,
      deck: personagem.deck,
      idComicVineCharacter: personagem.id,
      imagemMediumUrl: personagem.image?.medium_url,
      imagemSmallUrl: personagem.image?.small_url,
      imagemTinyUrl: personagem.image?.tiny_url,
      siteDetailUrl: personagem.site_detail_url,
      birth: personagem.birth,
      countOfIssueAppearances: personagem.count_of_issue_appearances,
      firstAppearedName: personagem.first_appeared_in_issue?.name,
      firstAppearedIssueNumber: personagem.first_appeared_in_issue?.issue_number,
      gender: personagem.gender,
      originName: personagem.origin?.name,
      realName: personagem.real_name
    });
    this.showComicVineModal = false;
  }

  salvar() {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const personagem: Personagem = {
      ...formValue,
      aliases: formValue.aliases?.substring(0, 65535), // Garante que não exceda
      deck: formValue.deck?.substring(0, 65535), // Garante que não exceda
      id: formValue.id ?? undefined,
    } as Personagem;

    if (personagem.id) {
      this.personagemService.atualizar(personagem.id, personagem).subscribe({
        next: () => this.voltar(),
        error: (err) => console.error('Erro ao atualizar:', err)
      });
    } else {
      this.personagemService.criar(personagem).subscribe({
        next: () => this.voltar(),
        error: (err) => console.error('Erro ao criar:', err)
      });
    }
  }

  voltar() {
    this.router.navigate(['/personagens']);
  }
}