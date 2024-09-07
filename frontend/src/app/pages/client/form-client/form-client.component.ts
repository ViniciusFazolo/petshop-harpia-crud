import { Component, OnInit } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { BtnsEndComponent } from '../../../components/button/btns-end/btns-end.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../../interfaces/client/client';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-form-client',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, BtnsEndComponent, NgSelectModule, ReactiveFormsModule],
  templateUrl: './form-client.component.html',
  styleUrl: './form-client.component.css'
})
export class FormClientComponent implements OnInit{
  idToUpdate: string | null = ''
  form: FormGroup

  constructor(private clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute){
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idToUpdate = params.get('id');
      if (this.idToUpdate) {
        this.clientService.listById(this.idToUpdate).subscribe(
          () => {
            this.listById();
          },
          () => {
            this.router.navigate(['/client']);
          }
        );
      }
    });
  }

  save(){
    if(!this.form.valid){
      alert('Preencha todos os campos')
    }

    if(this.idToUpdate){
      this.update()
    }
    else{
      this.create()
    }
  }

  create(){
    const client: Client = {
      name: this.form.value.name
    }

    this.clientService.create(client).subscribe({
      next: () => {
        alert('Registro cadastrado com sucesso!')
        this.router.navigate(['/client'])
      },
      error: () => {
        alert('Erro ao cadastrar, tente novamente!')
      }
    })
  }

  update(){
    const client: Client = {
      id: this.idToUpdate!,
      name: this.form.value.name
    }

    this.clientService.update(client).subscribe({
      next: () => {
        alert('Registro atualizado com sucesso!')
        this.router.navigate(['/client'])
      },
      error: () => {
        alert('Erro ao atualizar, tente novamente!')
      }
    })
  }

  listById(){
    this.clientService.listById(this.idToUpdate!).subscribe({
      next: (res) => {
        this.form.patchValue({
          name: res.name
        })
      },
      error: () => {
        alert('Erro ao procurar registro para edição!')
      }
    })
  }
}
