import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { UserService } from '../login/user.service';
import { OrderService } from '../products/order.service';
import { SecondaryHeaderComponent } from './secondary-header/secondary-header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule, SecondaryHeaderComponent, FooterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('content', { static: false })
  public bodyElement!: ElementRef;

  constructor(private appService: AppService, private userService: UserService, private orderService: OrderService, private renderer: Renderer2) {
    const scUser = localStorage.getItem('scUser') || null;
    const user = scUser ? JSON.parse(scUser) : null;
    this.appService.user.update(() => user);
    if (user && user._id) {
      this.userService.getUserById(user._id).subscribe((user: any) => {
        localStorage.setItem('scUser', JSON.stringify(user));
        this.appService.user.update(() => user);
        const cartCount = user.cartCount;
        this.appService.cartCount.update(() => cartCount);
      });
    }
  }

  ngAfterViewInit(): void {

    // Listen for header resize
    window.addEventListener('resize', () => {
      this.adjustDivBelowHeader();
    });
    this.adjustDivBelowHeader();
  }

  private adjustDivBelowHeader() {
    // Set margin-top of content to header height + additional margin
    const padding = 2; // Additional margin if needed
    const headerHeight = +this.appService.headerHeight();
    this.renderer.setStyle(this.bodyElement.nativeElement, 'padding-top', `${headerHeight + padding}px`);
  }
}
