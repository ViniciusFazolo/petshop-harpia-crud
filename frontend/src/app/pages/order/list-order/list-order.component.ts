import { Component, OnInit } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../interfaces/order/order';
import { RouterLinkWithHref } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-list-order',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, RouterLinkWithHref, CurrencyPipe],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent implements OnInit{
  orders!: Order[]

  constructor(private orderService: OrderService){}
  
  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.orderService.listAll().subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: () => {
        alert('Erro ao listar registros!');
      },
    });
  }

  remove(obj: Order) {
    if (confirm(`Realmente deseja excluir o registro ${obj.client.name}?`)) {
      this.orderService.delete(obj.id!).subscribe({
        next: () => {
          alert('Registro excluído com sucesso!');
          this.ngOnInit();
        },
        error: () => {
          alert(
            'Erro ao excluir registro! Pode ser que esteja vinculado a outros registros'
          );
        },
      });
    }
  }
}
