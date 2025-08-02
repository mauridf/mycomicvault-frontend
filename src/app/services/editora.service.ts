import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Editora {
  id?: string;
  aliases?: string;
  deck?: string;
  idComicVinePublisher?: number;
  logotipoMediumUrl?: string;
  logotipoSmallUrl?: string;
  logotipoTinyUrl?: string;
  address?: string;
  city?: string;
  state?: string;
  name: string;
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
  deck: string;
  id: number;
  image: {
    medium_url: string;
    small_url: string;
    tiny_url: string;
  };
  location_address: string;
  location_city: string;
  location_state: string;
  name: string;
  site_detail_url: string;
}

export interface ComicVineResponse {
  results: ComicVinePublisher[];
}

@Injectable({
  providedIn: 'root',
})
export class EditoraService {
  private readonly API = 'http://localhost:8080/api/editoras';
  private readonly COMIC_VINE_API = 'http://localhost:8080/api/comicvine/filtro';

  constructor(private http: HttpClient) {}

  listar(page: number = 0, size: number = 10, sort: string = 'name', search: string = ''): Observable<PageResponse<Editora>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PageResponse<Editora>>(this.API, { params });
  }

  buscarPorId(id: string): Observable<Editora> {
    return this.http.get<Editora>(`${this.API}/${id}`);
  }

  criar(editora: Editora) {
    return this.http.post<Editora>(this.API, editora);
  }

  atualizar(id: string, editora: Editora) {
    return this.http.put<Editora>(`${this.API}/${id}`, editora);
  }

  deletar(id: string) {
    return this.http.delete(`${this.API}/${id}`);
  }

  buscarNaComicVine(nome: string): Observable<ComicVineResponse> {
    const params = new HttpParams()
      .set('recurso', 'publishers')
      .set('nome', nome);
    return this.http.get<ComicVineResponse>(this.COMIC_VINE_API, { params });
  }
}
