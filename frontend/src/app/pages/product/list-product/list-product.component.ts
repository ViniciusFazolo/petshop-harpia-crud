import { Component, OnInit } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { ProductService } from '../../../services/product.service';
import { Router, RouterLinkWithHref } from '@angular/router';
import { Product } from '../../../interfaces/product/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, RouterLinkWithHref, CurrencyPipe],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
})
export class ListProductComponent implements OnInit {
  products!: Product[]
  
  constructor(private productService: ProductService, private router: Router){}

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.productService.listAll().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: () => {
        alert('Erro ao listar registros!');
      },
    });
  }

  remove(obj: Product) {
    if (confirm(`Realmente deseja excluir o registro ${obj.name}?`)) {
      this.productService.delete(obj.id!).subscribe({
        next: () => {
          alert('Registro excluído com sucesso!');
          this.ngOnInit()
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
