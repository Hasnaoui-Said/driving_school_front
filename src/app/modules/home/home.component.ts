import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { TopbarService } from '../../_metronic/layout/components/topbar/topbar.service';
import { AuthService } from '../auth';
import { TranslationService } from '../i18n';
import { HomeService } from './home.service';
import { Subscription } from 'rxjs/internal/Subscription';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg'
  },
  {
    lang: 'fr',
    name: 'French',
    flag: './assets/media/flags/france.svg'
  },
  {
    lang: 'ar',
    name: 'Arabic',
    flag: './assets/media/flags/saudi-arabia.svg'
  }
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSection = 'home';
  language: LanguageFlag;
  langs: LanguageFlag[] = languages;
  siteKey: string = '6LfH9lYdAAAAANMOlbruF8jNvC6l3fwCQvSuYQr5';
  disable: boolean = true;
  statistics: {
    suppliers: 0;
    regulators: 0;
    buyers: 0;
    orders: 0;
    workflows: 0;
  };
  Contactform = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    captcha: new FormControl('', Validators.required)
  });
  subscriptions: Subscription[] = [];
  constructor(
    public authService: AuthService,
    private snackBar: SnackbarService,
    private translationService: TranslationService,
    public topBarService: TopbarService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.setLanguage(this.translationService.getSelectedLanguage());
    this.statistics = {
      suppliers: 0,
      regulators: 0,
      buyers: 0,
      orders: 0,
      workflows: 0
    };
    const sb = this.homeService.getStatistics().subscribe((res: any) => {
      this.statistics = res.data;
    });
    if (this.authService.isNewUserAccountValue) {
      this.authService.isNewUserAccountValue = false;
      const navbar: HTMLElement | null = document.getElementById('navbar');
      navbar!.style.backgroundColor = '#673AB7';
      navbar!.style.padding = '10px';
      this.snackBar.push({
        message: 'AUTH.GENERAL.MSG_PENDING_ACCOUNT',
        type: 'warning'
      });
    }
    this.subscriptions.push(sb);
  }

  windowScroll() {
    const navbar: HTMLElement | null = document.getElementById('navbar');
    if (navbar)
      if (
        document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40
      ) {
        navbar.style.backgroundColor = '#272a33';
        navbar.style.padding = '10px';
      } else {
        navbar.style.backgroundColor = '';
        navbar.style.padding = '20px';
      }
  }

  collapsed: boolean = false;

  toggleMenu() {
    let menu = document.getElementById('navbarCollapse');

    let classes = menu?.classList;

    if (classes?.toString().includes('show')) {
      menu?.classList.remove('show');
      this.collapsed = false;
    } else {
      this.collapsed = true;
      menu?.classList.add('show');
    }
  }

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  selectLanguage(lang: string) {
    localStorage.setItem('language', lang);
    this.setLanguage(lang);
    document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  isLoading: boolean = false;
  sendMessage() {
    this.isLoading = true;
    const contactData = this.Contactform.value;
    this.homeService.sendContactform(contactData).subscribe();

    this.snackBar.push({
      message: 'SHARED.FAQ.SnackBars.Message',
      type: 'success'
    });

    this.Contactform.get('email')?.clearValidators();
    this.Contactform.reset();
    this.isLoading = false;
    grecaptcha.reset();
  }
  resolved(token: any) {
    this.disable = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
