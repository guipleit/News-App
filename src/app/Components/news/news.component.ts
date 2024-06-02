import { Component, OnChanges, OnInit } from '@angular/core';
import { NewsService } from '../../Services/news.service';
import { Article } from '../../Types/Article';
import { ArticleCardComponent } from '../article-card/article-card.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [ArticleCardComponent, ReactiveFormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})

export class NewsComponent implements OnInit, OnChanges {
  articles?: Article[];
  loading = true;
  apiError = false;
  errorMessage: string = '';
  searchForm = new FormGroup({
    search: new FormControl('')
  });
  paginatedArticles?: Article[];
  currentPage: number = 1;
  pageSize: number = 6;
  totalArticles: number = 0;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNews("AI");
  }

  ngOnChanges(): void {
    console.log("Value", this.searchForm.value);
    
  }

  getNews(query: string): void {
    this.loading = true;
    this.articles = [];
    this.newsService.getNews(query).subscribe({
      next: (response) => {
        this.articles = response.articles;
        this.totalArticles = this.articles!.length; 
        this.deleteBadArticles(this.articles!);
        this.insertArticleId(this.articles!);
        this.updatePaginatedArticles();
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

  updatePaginatedArticles(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedArticles = this.articles!.slice(startIndex, endIndex);
  }

  totalPages() {
    return Math.ceil(this.totalArticles / this.pageSize);
  }

  previousPage(): void {
    const previousPage = this.currentPage - 1;
    if (previousPage > 0) {
      this.currentPage = previousPage;
      this.updatePaginatedArticles();
    }
  }
  nextPage(): void {
    const nextPage = this.currentPage + 1;
    if (nextPage > 0 && nextPage <= Math.ceil(this.totalArticles / this.pageSize)) {
      this.currentPage = nextPage;
      this.updatePaginatedArticles();
    }
  }

}
