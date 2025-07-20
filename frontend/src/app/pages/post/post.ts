import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTableComponent } from '../../component/data-table';
import { ColDef, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { ApiClientService } from '../../../../api-sdk';
import { from, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { LayoutService } from '../../layout/service/layout.service';

@Component({
    selector: 'app-post',
    standalone: true,
    providers: [ApiClientService, MessageService],
    imports: [RouterModule, DataTableComponent, ButtonModule, DialogModule, ReactiveFormsModule, FormsModule, InputTextModule, TextareaModule],
    template: `
        <div class="bg-surface-0 dark:bg-surface-900 p-4 ">
           <div class="flex justify-end mb-4 gap-x-4">
            <a routerLink="/public" pButton>Get Public Posts</a>
            <p-button label="Add Post" (click)="createPostDialog = true"></p-button>
           </div>
            <app-data-table [rowData]="rowData" [columnDefs]="columnDefs"></app-data-table>

           <p-dialog header="Add Post" [(visible)]="createPostDialog" [style]="{ width: '600px' }" [modal]="true">
           <form [formGroup]="createPostForm" (ngSubmit)="onSubmit()">
  <div class="flex flex-col gap-4">
    <label for="title">Title</label>
    <input
    id="title"
    pInputText
      formControlName="title"
      placeholder="Title"
      class="w-full"
    />
    <label  for="content">Content</label>
    <textarea
    id="content"
    pInputTextarea
    maxlength="200"
      formControlName="content"
      placeholder="Content"
      class="w-full"
      autoResize="true"
      rows="5"
    ></textarea>
  </div>

  <div class="flex justify-end mt-4 gap-2">
    <p-button
      label="Cancel"
      icon="pi pi-times"
      type="button"
      (click)="createPostDialog = false"
      severity="secondary"
      text
    ></p-button>

    <p-button
      label="Save"
      icon="pi pi-check"
      type="submit"
      severity="danger"
      outlined
      autofocus
    ></p-button>
  </div>
</form>

                </p-dialog>
        </div>
    `
})
export class Post implements OnInit {
    createPostForm!: FormGroup;

    constructor(private apiClientService: ApiClientService, private layoutService: LayoutService, private fb: FormBuilder, private messageService: MessageService) {
        this.createPostForm = this.fb.group({
            title: new FormControl('', [Validators.required]),
            content: new FormControl('', [Validators.required, Validators.maxLength(200)]),
        });
    }
    createPostDialog: boolean = false;

    onSubmit() {
        const r = this.apiClientService.fetcher.path('/posts').method('post').create()
        const newRow = {
            title: this.createPostForm.get('title')?.value,
            content: this.createPostForm.get('content')?.value,
            author: {
                name: this.layoutService.getUsername(),
            },
            createdAt: new Date(),
        };
        this.createPostDialog = false;
        this.createPostForm.reset();
        this.rowData = [newRow, ...this.rowData];
        from(r({ content: newRow.content, title: newRow.title })).subscribe({
            next: (res) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Post created successfully' });
            },
            error: (err) => {
                const index = this.rowData.indexOf(newRow);
                if (index > -1) {
                    this.rowData.splice(index, 1);
                }
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Post creation failed' });
            }
        })
    }
    columnDefs: ColDef[] = [
        { headerName: 'Title', field: 'title', filter: 'agTextColumnFilter' },
        { headerName: 'Excerpt', field: 'content', filter: 'agTextColumnFilter' },
        { headerName: 'Author', field: 'author.name', filter: 'agTextColumnFilter' },
        { headerName: 'Published Date', field: 'createdAt', valueFormatter: (params) => new Date(params.value).toLocaleDateString(), filter: 'agDateColumnFilter', },
    ];
    rowData: any[] = [];
    totalRows: number = 0;

    ngOnInit(): void {
        this.fetchPosts();
    }

    fetchPosts(page: number = 0) {
        const r = this.apiClientService.fetcher.path('/posts').method('get').create()
        from(r({ page })).subscribe({
            next: (res) => {
                this.rowData = res.data.rows || [];
                this.totalRows = res.data.count || 0;
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}
