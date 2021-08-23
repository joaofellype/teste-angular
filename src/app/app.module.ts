import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
//COMPONENTS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConsultaChamadosComponent } from './pages/consulta-chamados/consulta-chamados.component';
import { CadastroAssuntoComponent } from './pages/cadastro-assunto/cadastro-assunto.component';
import { DetalheChamadoComponent } from './pages/detalhe-chamado/detalhe-chamado.component';
import { RankingChamadosComponent } from './pages/ranking-chamados/ranking-chamados.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AssuntoAutoCompleteComponent } from './components/assunto-auto-complete/assunto-auto-complete.component';
import { PeriodoCalendarComponent } from './components/periodo-calendar/periodo-calendar.component';
// PRIME
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { MessagesModule } from 'primeng/messages';
import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ConsultaChamadosComponent,
    CadastroAssuntoComponent,
    DetalheChamadoComponent,
    RankingChamadosComponent,
    PaginaNaoEncontradaComponent,
    AssuntoAutoCompleteComponent,
    PeriodoCalendarComponent,
  ],
  imports: [
    // ANGULAR
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    // APP
    AppRoutingModule,
    CoreModule,
    // PRIME
    MenubarModule,
    PanelMenuModule,
    PanelModule,
    CardModule,
    ButtonModule,
    CalendarModule,
    AutoCompleteModule,
    DropdownModule,
    TableModule,
    TagModule,
    ToastModule,
    DialogModule,
    FormsModule,
    EditorModule,
    MessagesModule,
    ChartModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
