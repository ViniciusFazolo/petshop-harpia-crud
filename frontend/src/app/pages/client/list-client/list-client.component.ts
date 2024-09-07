import { Component, OnInit } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../interfaces/client/client';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, RouterLinkWithHref],
  templateUrl: './list-client.component.html',
  styleUrl: './list-client.component.css'
})
export class ListClientComponent implements OnInit{
  clients!: Client[]

  constructor(private clientService: ClientService){}

  ngOnInit(): void {
      this.listAll()
  }

  listAll(){
    this.clientService.listAll().subscribe({
      next: (res) => {
        this.clients = res
      },
      error: () => {
        alert('Erro ao listar registros!')
      }
    })
  }

  remove(client: Client){
    if(confirm(`Realmente deseja excluir o registro ${client.name}?`)){
      this.clientService.delete(client.id!).subscribe({
        next: () => {
          alert('Registro excluído com sucesso!')
          this.ngOnInit()
        },
        error: () => {
          alert('Erro ao excluir registro! Pode ser que esteja vinculado a outros registros')
        }
      })
    }
  }
}
