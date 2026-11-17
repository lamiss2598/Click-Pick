import { Component } from '@angular/core';

interface Slot {
  time: string;
  label: string;
  full: boolean;
}

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss'],
})
export class HeroBannerComponent {
  slots: Slot[] = [
    { time: '12:00', label: '4 places', full: false },
    { time: '12:30', label: '2 places', full: false },
    { time: '13:00', label: 'Complet', full: true },
    { time: '13:30', label: '6 places', full: false },
  ];

  selected = '12:30';

  select(slot: Slot): void {
    if (!slot.full) {
      this.selected = slot.time;
    }
  }
}
