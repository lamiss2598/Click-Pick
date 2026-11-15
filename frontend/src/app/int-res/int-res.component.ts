
import { Component } from '@angular/core';

@Component({
  selector: 'app-int-res',
  templateUrl: './int-res.component.html',
  styleUrls: ['./int-res.component.css']
})
export class IntResComponent {

  activeSection: string = 'commandes';

  selectSection(section: string) {
    this.activeSection = section;
  }

}

