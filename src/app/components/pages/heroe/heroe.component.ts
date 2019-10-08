import { HeroeModel } from './../../../models/heroe.models';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute
  ) {}

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario invalido');
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }
    peticion.subscribe((data) => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        type: 'success'
      });
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id !== 'nuevo') {
      this.heroesService.getHeore(id).subscribe((data: HeroeModel) => {
        this.heroe = data;
        this.heroe.id = id;
      });
    }
  }
}
