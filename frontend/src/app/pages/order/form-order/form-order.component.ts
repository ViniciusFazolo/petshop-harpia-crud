import { Component } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { BtnsEndComponent } from '../../../components/button/btns-end/btns-end.component';
import { FormArray, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../interfaces/order/order';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product/product';
import { CurrencyPipe } from '@angular/common';
import { Client } from '../../../interfaces/client/client';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-form-order',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, BtnsEndComponent, NgSelectModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './form-order.component.html',
  styleUrl: './form-order.component.css'
})
export class FormOrderComponent {
  form: FormGroup
  idToUpdate: string = ''
  products!: Product[]
  clients!: Client[]
  totalPrice: number = 0

  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, private productService: ProductService, private clientService: ClientService, private router: Router){
    this.form = new FormGroup({
      client: new FormControl(null, [Validators.required]),
      products: new FormArray([], [Validators.required]),
      selectedProduct: new FormControl(null),
      qt: new FormControl(0)
    })
  }

  ngOnInit(): void {
    this.listProducts()
    this.listClients();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idToUpdate = params.get('id')!;
      if (this.idToUpdate) {
        this.orderService.listById(this.idToUpdate).subscribe(
          () => {
            this.listById();
          },
          () => {
            this.router.navigate(['/order']);
          }
        );
      }
    });
  }

  save(){
    if(!this.form.valid){
      alert('Preencha todos os campos')
      return;
    }

    this.create()
  }

  create(){
    const order: Order = {
      client: this.form.value.client,
      products: this.form.value.products,
      totalPrice: this.totalPrice
    }

    this.orderService.create(order).subscribe({
      next: () => {
        alert('Registro cadastrado com sucesso!')
        this.router.navigate(['/order'])
      },
      error: () => {
        alert('Erro ao cadastrar, tente novamente!')
      }
    })
  }

  listById(){
    this.orderService.listById(this.idToUpdate!).subscribe({
      next: (res) => {
        this.form.patchValue({
          client: res.client,
        });

        res.products.forEach(item => {
          (this.form.get('products') as FormArray).push(
            new FormGroup({
              product: new FormControl(item.product),
              qt: new FormControl(item.qt)
            })
          );
        })

        this.totalPrice = res.totalPrice
      },
      error: () => {
        alert('Erro ao procurar registro para edição!')
      }
    })
  }

  addProduct(){
    if(this.form.value.selectedProduct == null){
      alert('Selecione pelo menos um produto')
      return;
    }
    
    if(this.form.value.qt <= 0){
      alert('A quantidade deve ser maior que 0')
      return;
    }

    (this.form.get('products') as FormArray).push(
      new FormGroup({
        product: new FormControl(this.form.value.selectedProduct),
        qt: new FormControl(this.form.value.qt)
      })
    );

    this.totalPrice += this.form.value.selectedProduct.price * this.form.value.qt
  }
  
  removeProduct(index: number) {
    const productControl = (this.form.get('products') as FormArray).at(index);
    this.totalPrice -= productControl.value.product.price * productControl.value.qt;

    (this.form.get('products') as FormArray).removeAt(index);
  }

  listProducts(){
    this.productService.listAll().subscribe({
      next: (res) => {
        this.products = res
      }
    })
  }

  listClients(){
    this.clientService.listAll().subscribe({
      next: (res) => {
        this.clients = res
      }
    })
  }
}
