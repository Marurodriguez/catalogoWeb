import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  companyName = 'SM Soluciones';
  contactEmail = 'info@natural-snack.com';
}