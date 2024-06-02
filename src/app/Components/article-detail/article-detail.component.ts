import { Component, OnInit } from '@angular/core';
import { Article } from '../../Types/Article';
import { Location } from '@angular/common';
import { NavigationArticle } from '../../Types/NavigationArticle';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})

export class ArticleDetailComponent implements OnInit{
  article!: Article;

  constructor(private location: Location) { }

  ngOnInit(): void {
    const navigation = this.location.getState() as NavigationArticle;
    this.article = navigation.article;
  }
}
