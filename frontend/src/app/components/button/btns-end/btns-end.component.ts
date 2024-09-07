import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

type icons = 'seta' | 'x'

@Component({
  selector: 'app-btns-end',
  standalone: true,
  imports: [RouterLinkWithHref, NgIf],
  templateUrl: './btns-end.component.html',
  styleUrl: './btns-end.component.css'
})
export class BtnsEndComponent {
  @Input() iconPrevious: icons = 'x'  
  @Input() previousPage!: string
  @Input() showBtn: boolean = true;
  @Input() btnPrevious: string = 'CANCELAR'
  @Output() onClickEmitter = new EventEmitter();

  onClick(){
    this.onClickEmitter.emit()
  }
}
