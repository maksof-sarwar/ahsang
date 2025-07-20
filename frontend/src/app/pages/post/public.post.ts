import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ApiClientService } from '../../../../api-sdk';
import { from } from 'rxjs';

@Component({
  selector: 'app-public-post',
  imports: [CommonModule],
  providers: [ApiClientService,MessageService],
  template: `
    <!-- public.post.html -->
<div class="max-w-3xl mx-auto px-4 py-8">
  <h2 class="text-2xl font-bold mb-6 text-gray-800">Public Blog Posts</h2>

  <div *ngIf="rowData.length === 0" class="text-gray-500">
    No blog posts available.
  </div>

  <div *ngFor="let post of rowData" class="border-b border-gray-200 py-6">
    <h3 class="text-xl font-semibold text-blue-600">{{ post.title }}</h3>
    <p class="text-gray-700 mt-2" [innerHTML]="post.content"></p>

    <div class="text-sm text-gray-500 mt-3 flex items-center gap-2">
      <span>By {{ post.author?.name || 'Unknown' }}</span>
      <span>&bull;</span>
      <span>{{ post.publishedDate | date: 'mediumDate' }}</span>
    </div>
  </div>
</div>

  `,
})
export class PublicPost implements OnInit {
  public rowData: any[] = [];

  constructor(private apiClientService: ApiClientService) { }

  ngOnInit(): void {
    from(this.apiClientService.fetcher.path('/posts/public').method('get').create()({})).subscribe({
      next: (res) => {
        this.rowData = res.data.rows || [];
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
