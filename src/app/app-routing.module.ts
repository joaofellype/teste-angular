import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CadastroAssuntoComponent } from './pages/cadastro-assunto/cadastro-assunto.component';
import { DetalheChamadoComponent } from './pages/detalhe-chamado/detalhe-chamado.component';
import { ConsultaChamadosComponent } from './pages/consulta-chamados/consulta-chamados.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingChamadosComponent } from './pages/ranking-chamados/ranking-chamados.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'chamados', component: ConsultaChamadosComponent, canActivate: [AuthGuard] },
  { path: 'chamados/:id', component: DetalheChamadoComponent, canActivate: [AuthGuard] },
  { path: 'ranking', component: RankingChamadosComponent, canActivate: [AuthGuard] },
  { path: 'assunto', component: CadastroAssuntoComponent, canActivate: [AuthGuard] },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
