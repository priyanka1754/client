import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { UserService } from '../login/user.service';
import { SecondaryHeaderComponent } from './secondary-header/secondary-header.component';
import { FooterComponent } from './footer/footer.component';
import { AppHelper } from '../utils/app.helper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterModule,
    SecondaryHeaderComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('content', { static: false })
  public bodyElement!: ElementRef;

  constructor(
    private appService: AppService,
    private userService: UserService,
    private renderer: Renderer2
  ) {
    const user = AppHelper.getFromLocalStorage('scUser');
    console.log('user => ', user);
    if (user && user._id) {
      this.userService.getUserById(user.CustomerId).subscribe((user: any) => {
        console.log('aaa => ', user);
        AppHelper.saveToLocalStorage('scUser', user);
        this.appService.user.update(() => user);
        const cartCount = user?.cartCount;
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
    this.renderer.setStyle(
      this.bodyElement.nativeElement,
      'padding-top',
      `${headerHeight + padding}px`
    );
  }
}
