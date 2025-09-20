import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScoreDistribution} from '../../../../types/score-distribution.type';
import {Fluid} from 'primeng/fluid';
import {UIChart} from 'primeng/chart';
import {NgIf} from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
    selector: 'app-score-distribution',
    imports: [
        Fluid,
        UIChart,
        NgIf,
    ],
    templateUrl: './score-distribution.component.html',
    styleUrl: './score-distribution.component.css'
})
export class ScoreDistributionComponent implements OnInit, OnChanges {
    @Input() scoreDistribution: ScoreDistribution[] = [];

    protected chartData: any = {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                '#42A5F5',
            ],
            borderWidth: 1
        }]
    };

    protected options: any;
    protected plugins: any;

    constructor() {
        this.plugins = [ChartDataLabels];

        this.options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Distribution des scores des perdants',
                    font: { size: 16 }
                },
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                    font: { weight: 'bold' },
                    formatter: (value: number) => value
                }
            }
        };
    }

    ngOnInit() {
        this.updateChartData();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['scoreDistribution']) {
            this.updateChartData();
        }
    }

    private updateChartData() {
        if (!this.scoreDistribution?.length) {
            this.chartData.labels = [];
            this.chartData.datasets[0].data = [];
            return;
        }

        const documentStyle = getComputedStyle(document.documentElement);

        const maxValue = Math.max(...this.scoreDistribution.map(d => d.count));

        this.chartData = {
            labels: this.scoreDistribution.map(dist => dist.loserScore),
            datasets: [{
                data: this.scoreDistribution.map(dist => dist.count),
                backgroundColor: this.scoreDistribution.map(dist => {
                    // Normaliser entre 1 et 9
                    const intensity = Math.ceil((dist.count / maxValue) * 9); // 1 → 9
                    const step = 900 - Math.floor(intensity / 2) * 100;
                    return documentStyle.getPropertyValue(`--p-blue-${step}`);
                }),
                borderWidth: 1
            }]
        };
    }
}
