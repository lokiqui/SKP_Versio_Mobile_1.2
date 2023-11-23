import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Instruccion } from '../models/Instruccion';

@Injectable({
  providedIn: 'root'
})
export class InstruccionService {
  coleccion: AngularFirestoreCollection<Instruccion>;

  constructor(angularFirestore: AngularFirestore) {
    this.coleccion = angularFirestore.collection('aerodromos');
  }

  getRef() {
    return this.coleccion.ref;
  }

  getInstrucciones() {
    return this.coleccion.get();
  }
}
