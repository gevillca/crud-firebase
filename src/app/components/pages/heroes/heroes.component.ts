import Swal from 'sweetalert2';
import { HeroeModel } from './../../../models/heroe.models';
import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
  cargando = false;
  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe((data) => {
      this.heroes = data;
      this.cargando = false;
      console.log('data=>', data);
    });
  }
  borrarHeroe(heroe: HeroeModel, i: number) {
    Swal.fire({
      title: '¿Esta Seguro?',
      text: `Esta Seguro que desea eliminar a  ${heroe.nombre}`,
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    }).then((data) => {
      if (data.value) {
        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });
  }
}
