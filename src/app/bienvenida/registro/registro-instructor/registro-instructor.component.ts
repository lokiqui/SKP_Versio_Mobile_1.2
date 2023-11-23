import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro-instructor',
  templateUrl: './registro-instructor.component.html',
  styleUrls: ['./registro-instructor.component.scss']
})
export class RegistroInstructorComponent implements OnInit {
  siteKey: string = environment.siteKey;
  aerodromos = [
    'Rio de la Plata',
    'Morón',
    'Luján',
    'San_Fernando',
    'Merlo',
    'Pergamino',
    'Tandil',
    'Navarro',
    'Quilmes',
    'Argentino',
    'Buenos Aires',
    'Haedo'

  ];
  signupForm: FormGroup | any;
  // error:string = '';
  foto:File|any;
  @Output() formularioEnviado: EventEmitter<any> = new EventEmitter<any>();
  @Input() error: string = '';
  @Input() isLoading: boolean = false;

  get nombre() { return this.signupForm.get('nombre'); }
  get apellido() { return this.signupForm.get('apellido'); }
  get edad() { return this.signupForm.get('edad'); }
  get dni() { return this.signupForm.get('dni'); }
  get email() { return this.signupForm.get('email'); }
  get clave() { return this.signupForm.get('clave'); }

  constructor() {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'nombre': new FormControl(null, [Validators.required, this.emptyValidator]),
      'apellido': new FormControl(null, [Validators.required, this.emptyValidator]),
      'edad': new FormControl(null, [Validators.required, Validators.min(18), Validators.max(99)]),
      'dni': new FormControl(null, [Validators.required, Validators.min(999999), Validators.max(99999999)]),
      'aerodromos': new FormArray([]),
      'email': new FormControl(null, [Validators.required, this.emptyValidator]),
      'clave': new FormControl(null, [Validators.required, this.emptyValidator]),
      'recaptchaReactive': new FormControl(null, Validators.required)
    });
  }
  onAddInstruccion() {
    const control = new FormControl(null);
    (<FormArray>this.signupForm.get('aerodromos')).push(control);
  }

  onChangeInstruccion($event:any) {
    const chequeado = $event.target.checked;
    const instruccion = $event.target.value;

    if (chequeado) {
      const control = new FormControl(instruccion, Validators.required);
      (<FormArray>this.signupForm.get('aerodromos')).push(control);
    }
    else {
      const indice = (<FormArray>this.signupForm.get('aerodromos')).value.findIndex(
        (item:string) => item === instruccion
      );
      (<FormArray>this.signupForm.get('aerodromos')).removeAt(indice);
    }
  }
  
  uploadFile(event:any) {
    if (event.target.files.length === 1) {
      this.foto = event.target.files[0];
    }
    else {
      this.foto = null;
    }
  }

  emptyValidator(control: AbstractControl): object | null {
    const valor = control.value;
    if (valor) {
      if (valor.trim().length === 0) {
        return { emptyField: true};
      };
    };
    return null;
  }

  onSubmit() {
    const obj = this.signupForm.value;
    obj.foto = this.foto;
    // this.registroService.registrarInstructor(obj).then(
    //   () => this.router.navigateByUrl('verificar')
    // )
    // .catch(
    //   err => this.error = err.message
    // );

    this.formularioEnviado.emit(obj);
  }

}
