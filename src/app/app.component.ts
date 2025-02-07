import { StorageService } from './services/storage.service';
import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo';
  htmlTag!: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.htmlTag = this.elementRef.nativeElement.ownerDocument.documentElement;
    this.renderer.setAttribute(this.htmlTag, 'lang', 'en');
    this.renderer.setAttribute(
      this.htmlTag,
      'theme',
      this._storageService.getTheme() ?? 'light-blue'
    );
  }

  updateTheme(theme: string) {
    this.renderer.setAttribute(this.htmlTag, 'theme', theme);
  }
}
