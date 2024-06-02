import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../Services/news.service';
import { Article } from '../../Types/Article';
import { ArticleCardComponent } from '../article-card/article-card.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [ArticleCardComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})

export class NewsComponent implements OnInit {
  articles?: Article[];
  loading = true;
  apiError = false;
  errorMessage: string = '';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getNews("AI").subscribe({
      next: (response) => {
        this.articles = response.articles;
        this.deleteBadArticles(this.articles!);
        this.insertArticleId(this.articles!);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load articles', err);
        this.apiError = true;
        this.loading = false;
        this.errorMessage = err;
      }
    });
  }


  deleteBadArticles(articleArray: Article[]): void {
    for (let i = articleArray.length - 1; i >= 0; i--) {
      if (Object.values(articleArray[i]).some(value => value === null || value === '[Removed]')) {
        articleArray.splice(i, 1);
      }
    }

  }

  insertArticleId(articleArray: Article[]): void {
    for(let i = 0; i < articleArray.length; i++) {
      articleArray[i].id = i + 1;
    }
  }

}
