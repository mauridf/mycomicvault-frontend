import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { EditorasListComponent } from './pages/editoras-list/editoras-list';
import { EditorasFormComponent } from './pages/editoras-form/editoras-form';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'editoras', component: EditorasListComponent },
  { path: 'editoras/cadastrar', component: EditorasFormComponent },
  { path: 'editoras/cadastrar/:id', component: EditorasFormComponent },
];
