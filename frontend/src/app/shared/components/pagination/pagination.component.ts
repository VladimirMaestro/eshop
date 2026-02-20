import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-pagination',
  imports: [
    NgForOf
  ],
  templateUrl: 'pagination.component.html'
})
export class PaginationComponent implements OnInit {
  /** Текущая страница */
  @Input() page: number = 1;

  /** Общее количество страниц */
  @Input() total: number = 1;

  /** Сколько страниц отображать в списке (например, 5) */
  @Input() visiblePages: number = 5;

  /** Событие изменения страницы */
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = [];

  ngOnInit(): void {
    this.updatePages();
  }

  ngOnChanges(): void {
    this.updatePages();
  }

  /** Пересчитать массив отображаемых страниц */
  updatePages(): void {
    const half = Math.floor(this.visiblePages / 2);
    let start = Math.max(1, this.page - half);
    let end = Math.min(this.total, start + this.visiblePages - 1);

    // корректируем начало, если уперлись в конец
    if (end - start < this.visiblePages - 1) {
      start = Math.max(1, end - this.visiblePages + 1);
    }

    this.pages = [];
    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }

  /** Переключение на страницу */
  selectPage(page: number): void {
    if (page >= 1 && page <= this.total && page !== this.page) {
      this.page = page;
      this.pageChange.emit(this.page);
      this.updatePages();
    }
  }

  prev(): void {
    this.selectPage(this.page - 1);
  }

  next(): void {
    this.selectPage(this.page + 1);
  }
}
