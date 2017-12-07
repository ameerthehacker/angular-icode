import { 
  Component,
  OnInit, 
  Input,
  Output, 
  EventEmitter } from '@angular/core';
import { ComponentFactoryBoundToModule } from '@angular/core/src/linker/component_factory_resolver';

@Component({
  selector: 'ic-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  count: number = 0;
  @Input()
  perPage: number = 5;
  curPage: number = 1;
  pages: any[] = [];
  noPage: number = 0;
  maxPages: number = 11;
  delimeter: string = '..';
  @Output('select')
  pageSelected: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { 
  }

  paginate(page, perPage, count) {
    this.perPage = perPage;
    this.count = count;
    this.noPage = Math.ceil(this.count / this.perPage);
    this.selectPage(page);
  }
  private addPages(i, j = undefined) {
    let start, end;
    if(j == undefined) {
      start = 1;
      end = i;
    }
    else {
      start = i;
      end = j;
    }
    for(let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }
  selectPage(page) {
    // Do nothing if clicked on the delimeter
    if(page == this.delimeter) {
      return;
    }
    this.curPage = page;
    this.pages = [];
    if(this.noPage > this.maxPages) {
      // Get remaining pages count excluding first two and last two pages
      let remPages = this.maxPages - 4;
      // Check if the page falls within the first 6 pages
      if(remPages - this.curPage > 0) {
        this.addPages(1, remPages + 2);
        this.pages.push(this.delimeter);
        this.addPages(this.noPage - 1, this.noPage);        
      }
      // Check if the page falls within the last 6 pages      
      else if(this.noPage - this.curPage <= remPages - 2) {
        this.addPages(2);        
        this.pages.push(this.delimeter);
        // remPages - 1 is to exclude the delimeter as a count
        this.addPages(this.noPage - remPages - 1, this.noPage);
      }
      else {
        this.addPages(2);
        this.pages.push(this.delimeter);
        let endPage = this.noPage;
        let sidePages = Math.floor(remPages / 2);        
        if(remPages % 2 == 0) {
          endPage = this.curPage + sidePages - 1;
        }
        else {
          endPage = this.curPage + sidePages;          
        }
        this.addPages(this.curPage - sidePages, this.curPage);
        this.addPages(this.curPage + 1, endPage);        
        this.pages.push(this.delimeter);
        this.addPages(this.noPage - 1, this.noPage);                
      }  
    }
    else {
      this.addPages(this.noPage);
    }
  }
  nextPage() {
    if(this.curPage < this.noPage) {
      this.curPage += 1;
      this.selectPage(this.curPage); 
      this.pageSelected.emit(this.curPage);    
    }
  }
  prevPage() {
    if(this.curPage > 1) {
      this.curPage -= 1;
      this.selectPage(this.curPage);
      this.pageSelected.emit(this.curPage);          
    }
  }
  onPageSelect(page) {
    this.pageSelected.emit(page);
  }

}
