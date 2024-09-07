import { Component } from '@angular/core';
import { DefaultLayoutPagesComponent } from '../../../components/default-layout-pages/default-layout-pages.component';
import { AnimalService } from '../../../services/animal.service';
import { Animal } from '../../../interfaces/animal/animal';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list-animal',
  standalone: true,
  imports: [DefaultLayoutPagesComponent, RouterLinkWithHref],
  templateUrl: './list-animal.component.html',
  styleUrl: './list-animal.component.css',
})
export class ListAnimalComponent {
  animals!: Animal[]

  constructor(private animalService: AnimalService){}

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.animalService.listAll().subscribe({
      next: (res) => {
        this.animals = res;
      },
      error: () => {
        alert('Erro ao listar registros!');
      },
    });
  }

  remove(obj: Animal) {
    if (confirm(`Realmente deseja excluir o registro ${obj.name}?`)) {
      this.animalService.delete(obj.id!).subscribe({
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
