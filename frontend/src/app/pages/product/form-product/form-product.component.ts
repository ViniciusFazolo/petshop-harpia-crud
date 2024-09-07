import { Component } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { BtnsEndComponent } from '../../../components/button/btns-end/btns-end.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../interfaces/product/product';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, BtnsEndComponent, ReactiveFormsModule],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.css'
})
export class FormProductComponent {
  form: FormGroup
  idToUpdate: string = ''

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router){
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idToUpdate = params.get('id')!;
      if (this.idToUpdate) {
        this.productService.listById(this.idToUpdate).subscribe(
          () => {
            this.listById();
          },
          () => {
            this.router.navigate(['/product']);
          }
        );
      }
    });
  }

  save(){
    if(!this.form.valid){
      alert('Preencha todos os campos')
      return
    }

    if(this.idToUpdate){
      this.update()
    }
    else{
      this.create()
    }
  }

  create(){
    const obj: Product = {
      name: this.form.value.name,
      price: this.form.value.price
    }

    this.productService.create(obj).subscribe({
      next: () => {
        alert('Registro cadastrado com sucesso!')
        this.router.navigate(['/product'])
      },
      error: () => {
        alert('Erro ao cadastrar, tente novamente!')
      }
    })
  }

  update(){
    const obj: Product = {
      id: this.idToUpdate!,
      name: this.form.value.name,
      price: this.form.value.price
    }

    this.productService.update(obj).subscribe({
      next: () => {
        alert('Registro atualizado com sucesso!')
        this.router.navigate(['/product'])
      },
      error: () => {
        alert('Erro ao atualizar, tente novamente!')
      }
    })
  }

  listById(){
    this.productService.listById(this.idToUpdate!).subscribe({
      next: (res) => {
        this.form.patchValue({
          name: res.name,
          price: res.price
        })
      },
      error: () => {
        alert('Erro ao procurar registro para edição!')
      }
    })
  }
}
