import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.sass']
})
export class SearchbarComponent implements OnInit {

  @Input() width: string;
  @Input() searchOnInput = true;
  @Output() searchEvent = new EventEmitter<string>();

  constructor()
  {
    this.width = '';
  }

  ngOnInit(): void
  {
  }

  onSearch(input: HTMLInputElement): void
  {
    if (this.searchOnInput)
    {
      this.searchEvent.emit(input.value);
    }
  }

  onSearchEnter(input: HTMLInputElement): void
  {
    if (!this.searchOnInput)
    {
      this.searchEvent.emit(input.value);
    }
  }

  onClear(input: HTMLInputElement): void
  {
    input.value = '';
    this.onSearch(input);
  }
}
