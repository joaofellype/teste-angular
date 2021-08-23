import { Component, OnInit } from '@angular/core';
import Ranking from 'src/app/models/Ranking';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dadosGrafico1: any;
  dadosGrafico2: any;
  dadosGrafico3: any;
  private cores = ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA', '#7E57C2'];
  options = {
    legend: {
        display: false
    }
};

  constructor(private rankingService: RankingService) {}

  ngOnInit(): void {
    this.rankingService.getAll(null, null, null, 1).subscribe((resp) => {
      console.log(resp);
      let dados: Ranking[] = resp.slice(0, 5);
      this.dadosGrafico1 = {
        labels: dados.map((r) => r.solicitante),
        datasets: [
          {
            data: dados.map((r) => r.quantidade),
            backgroundColor: this.cores,
            hoverBackgroundColor: this.cores,
          },
        ],
      };
    });

    this.rankingService.getAll(null, null, null, 2).subscribe((resp) => {
      console.log(resp);
      let dados = resp.slice(0, 5);
      this.dadosGrafico2 = {
        labels: dados.map((r) => r.solicitante),
        datasets: [
          {
            data: dados.map((r) => r.quantidade),
            backgroundColor: this.cores,
            hoverBackgroundColor: this.cores,
          },
        ],
      };
    });

    this.rankingService.getAll(null, null, null, 8).subscribe((resp) => {
      console.log(resp);
      let dados = resp.slice(0, 10);
      this.dadosGrafico3 = {
        labels: dados.map((r) => r.solicitante),
        datasets: [
          {
            label: 'Areas',
            data: dados.map((r) => r.quantidade),
            backgroundColor: [...this.cores, ...this.cores],
          },
        ],
      };
    });
  }
}
