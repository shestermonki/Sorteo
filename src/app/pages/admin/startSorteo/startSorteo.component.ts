import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-start-sorteo',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './startSorteo.component.html',
  styleUrl: './startSorteo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartSorteoComponent { }
