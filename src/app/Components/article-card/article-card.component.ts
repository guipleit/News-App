import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../../Types/Article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent {
  @Input() article!: Article;
  @Output() clickEvent = new EventEmitter<Article>();

  constructor(private router: Router) { }

  onClick(): void {
    if (this.article.id) {
      this.clickEvent.emit(this.article);
      this.router.navigate(['/article', this.article.id], { state: { article: this.article } });
    }
  }

}
