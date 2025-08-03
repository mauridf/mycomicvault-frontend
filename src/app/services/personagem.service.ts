import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Personagem {
  id?: string;
  aliases?: string;
  birth?: string;
  countOfIssueAppearances?: number;
  deck?: string;
  firstAppearedName?: string;
  firstAppearedIssueNumber?: string;
  gender?: string;
  idComicVineCharacter?: number;
  imagemMediumUrl?: string;
  imagemSmallUrl?: string;
  imagemTinyUrl?: string;
  name: string;
  originName?: string;
  realName?: string;
  siteDetailUrl?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ComicVinePublisher {
  aliases: string;
  birth: string;
  count_of_issue_appearances: number;
  deck: string;
  first_appeared_in_issue: {
    api_detail_url: string;
    id: number;
    name: string;
    issue_number: string;
  };
  gender: string;
  id: number;
  image: {
    medium_url: string;
    small_url: string;
    tiny_url: string;
  };
  name: string;
  origin: {
    api_detail_url: string;
    id: number;
    name: string;
  };
  real_name: string;
  site_detail_url: string;
}

export interface ComicVineResponse {
  results: ComicVinePublisher[];
}

@Injectable({
  providedIn: 'root',
})
export class PersonagemService {
  private readonly API = 'http://localhost:8080/api/personagens';
  private readonly COMIC_VINE_API = 'http://localhost:8080/api/comicvine/buscar';

  constructor(private http: HttpClient) {}

  listar(page: number = 0, size: number = 10, sort: string = 'name', search: string = ''): Observable<PageResponse<Personagem>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PageResponse<Personagem>>(this.API, { params });
  }

  buscarPorId(id: string): Observable<Personagem> {
    return this.http.get<Personagem>(`${this.API}/${id}`);
  }

  criar(personagem: Personagem) {
    return this.http.post<Personagem>(this.API, personagem);
  }

  atualizar(id: string, personagem: Personagem) {
    return this.http.put<Personagem>(`${this.API}/${id}`, personagem);
  }

  deletar(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

  buscarNaComicVine(nome: string): Observable<ComicVineResponse> {
    const params = new HttpParams()
      .set('termo', nome)
      .set('recurso', 'character');
    return this.http.get<ComicVineResponse>(this.COMIC_VINE_API, { params });
  }
}
