import { Routes } from '@angular/router';
import { ArticleDetailComponent } from './Components/article-detail/article-detail.component';
import { NewsComponent } from './Components/news/news.component';

export const routes: Routes = [
    {path: '', component: NewsComponent},
    {path: 'article/:id', component: ArticleDetailComponent}
];
