import {Component, inject, input, ChangeDetectionStrategy} from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly location = inject(Location)

  links = input.required<NavItem[]>()

  isActive(href: string) {
    return this.location.path().startsWith(href)
  }
}

type NavItem = {
  title: string;
  href: string
}
