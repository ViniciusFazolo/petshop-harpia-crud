import { Component } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { BtnsEndComponent } from '../../../components/button/btns-end/btns-end.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../interfaces/animal/animal';
import { Client } from '../../../interfaces/client/client';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-form-animal',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, BtnsEndComponent, ReactiveFormsModule],
  templateUrl: './form-animal.component.html',
  styleUrl: './form-animal.component.css'
})
export class FormAnimalComponent {
  form: FormGroup;
  idToUpdate: string = ''
  clients!: Client[]

  constructor(private animalService: AnimalService, private clientSerivce: ClientService,private activatedRoute: ActivatedRoute, private router: Router){
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      client: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.listClients()
    this.activatedRoute.paramMap.subscribe((params) => {
      this.idToUpdate = params.get('id')!;
      if (this.idToUpdate) {
        this.animalService.listById(this.idToUpdate).subscribe(
          () => {
            this.listById();
          },
          () => {
            this.router.navigate(['/animal']);
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
    const obj: Animal = {
      name: this.form.value.name,
      client: this.form.value.client
    }

    this.animalService.create(obj).subscribe({
      next: () => {
        alert('Registro cadastrado com sucesso!')
        this.router.navigate(['/animal'])
      },
      error: () => {
        alert('Erro ao cadastrar, tente novamente!')
      }
    })
  }

  update(){
    const obj: Animal = {
      id: this.idToUpdate!,
      name: this.form.value.name,
      client: this.form.value.client
    }

    this.animalService.update(obj).subscribe({
      next: () => {
        alert('Registro atualizado com sucesso!')
        this.router.navigate(['/animal'])
      },
      error: () => {
        alert('Erro ao atualizar, tente novamente!')
      }
    })
  }

  listById(){
    this.animalService.listById(this.idToUpdate!).subscribe({
      next: (res) => {
        const selectedClient = this.clients.find(client => client.id === res.client.id);

        this.form.patchValue({
          name: res.name,
          client: selectedClient
        })
      },
      error: () => {
        alert('Erro ao procurar registro para edição!')
      }
    })
  }

  listClients(){
    this.clientSerivce.listAll().subscribe({
      next: (res) => {
        this.clients = res
      },
      error: () => {
        alert('Erro ao listar os clientes!')
      }
    })
  }
}
