import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  type ColDef,
  type GridReadyEvent,
  type CellClickedEvent,
  type RowSelectedEvent,
  type GridOptions,
  ModuleRegistry,
  AllCommunityModule,
  ClientSideRowModelModule
} from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule,ClientSideRowModelModule]);

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [AgGridAngular],
  encapsulation: ViewEncapsulation.None,
  template: `
  <div  class="ag-theme-alpine">
    <ag-grid-angular
      [style.height]="height"
      [style.width]="width"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      [gridOptions]="gridOptions"
      [defaultColDef]="defaultColDef"
      [pagination]="pagination"
      [paginationPageSize]="paginationPageSize"
      [rowSelection]="rowSelection"
      [suppressRowClickSelection]="suppressRowClickSelection"
      [animateRows]="animateRows"
      (gridReady)="onGridReady($event)"
      (cellClicked)="onCellClicked($event)"
      (rowSelected)="onRowSelected($event)">
    </ag-grid-angular>
    </div>
  `,
  styles: [`

  `]
})
export class DataTableComponent {
  @Input() columnDefs: ColDef[] = [];
  @Input() rowData: any[] = [];

  @Input() height: string = '400px';
  @Input() width: string = '100%';

  @Input() pagination: boolean = true;
  @Input() paginationPageSize: number = 5;
  @Input() rowSelection: 'single' | 'multiple' | undefined = 'single';
  @Input() suppressRowClickSelection: boolean = false;
  @Input() animateRows: boolean = true;

  @Input() gridOptions: GridOptions = {
    paginationPageSizeSelector: [5,10,20],
    paginationPageSize: 5,
  }; // Optional, but avoid using it for API references

  @Input() defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
  };

  @Output() gridReady = new EventEmitter<GridReadyEvent>();
  @Output() cellClicked = new EventEmitter<CellClickedEvent>();
  @Output() rowSelected = new EventEmitter<RowSelectedEvent>();

  private api: GridReadyEvent['api'] | null = null;

  onGridReady(event: GridReadyEvent): void {
    this.api = event.api;
    this.gridReady.emit(event);
  }

  onCellClicked(event: CellClickedEvent): void {
    this.cellClicked.emit(event);
  }

  onRowSelected(event: RowSelectedEvent): void {
    this.rowSelected.emit(event);
  }

  getSelectedRows(): any[] {
    return this.api?.getSelectedRows() || [];
  }

  clearSelection(): void {
    this.api?.deselectAll();
  }

  refreshData(): void {
    this.api?.refreshCells();
  }

  exportToCsv(filename?: string): void {
    this.api?.exportDataAsCsv({
      fileName: filename || 'grid-data.csv',
    });
  }
}