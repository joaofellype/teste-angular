import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  items: MenuItem[] = [];
  userLogado: boolean = true;

  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private config: PrimeNGConfig
  ) {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit() {
    this.config.setTranslation({
      dayNames: [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
      ],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      monthNamesShort: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      today: 'Hoje',
      clear: 'Limpar',
    });

    this.subscriptions.push(
      this.authService
        .getIsUserLoggedObservable()
        .subscribe((resp) => (this.userLogado = resp))
    );

    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: ['/'],
      },
      {
        label: 'Busca',
        icon: 'pi pi-search',
        routerLink: ['/chamados'],
      },
      {
        label: 'Ranking',
        icon: 'pi pi-chart-bar',
        routerLink: ['/ranking'],
      },
      {
        label: 'Assuntos',
        icon: 'pi pi-tags',
        routerLink: ['/assunto'],
      },
    ];
  }

  logoff() {
    console.log('logoff');
    this.authService.logoff();
    this.router.navigate(['/login']);
  }
}
