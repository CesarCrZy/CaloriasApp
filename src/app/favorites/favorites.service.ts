import { Injectable } from '@angular/core';
import { UserInfoBD } from '../modelos/userinfo';
import { AngularFireDatabase } from 'angularfire2/database';
import { Comida } from '../modelos/comida';
import { AngularFireAuth } from 'angularfire2/auth';
import { Table } from '../modelos/table';
import { UserInfo } from '../modelos/info';
import { Macros } from '../modelos/macros';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  id;
  key;
  


  constructor(private db: AngularFireDatabase, private ofauth: AngularFireAuth) {
	  var key;
	this.ofauth.authState.subscribe(async data => {
		if (data && data.email && data.uid) {
		  this.id = data.uid;
		  this.db.database.ref('Usuarios/').child(data.uid).child('/ingesta').once('value').then( function(snapshot){
			var calorias = (snapshot.val())
			
			for( key in calorias) {
			}
		  });
		}
	  })

  }
  GetComidasUser(uid) {
	this.comidaslist = this.db.list<Comida>('Comidas/' + this.id);
    return this.comidaslist;
	}

	DeleteFavoriteAF(key: string){
		return this.comidaslist.remove(key);
	}

	UpdateFavoriteAF(key: string, restaurant: Comida){
		return this.comidaslist.update(key, restaurant);
	}

	GetRecomdacion(uid){
		this.usuariosmacros = this.db.list<Macros>('Usuarios/' + this.id + '/macronutrientes');
		return this.usuariosmacros;
	}

	GetIngesta(uid){
		this.table = this.db.list<Table>('Usuarios/' + this.id + '/ingesta');
		return this.table;
	}

	GetIngesta1(uid){
		return this.db.object('Usuarios/' + this.id + '/ingesta');
	}
	AddFavoriteAF(restaurant: Comida, uid) {
		this.comidaslist = this.db.list<Comida>('Comidas/' + uid );
		return this.comidaslist.push(restaurant);
	}

	AddUserInfo(info: UserInfo, uid, email) {
		this.usuariosinfo = this.db.list<UserInfo>('Usuarios/' + uid + '/informacion');
		return this.usuariosinfo.push(info);
	}

	GetUserInfo(uid){
		return this.usuariosinfo = this.db.list<UserInfo>('Usuarios/' + uid + '/informacion');
	}

	AddUserMacros(macros: Macros, uid) {
		this.usuariosmacros = this.db.list<Macros>('Usuarios/' + uid + '/macronutrientes');
		return this.usuariosmacros.push(macros);
	}

	AddTable(table: Table, uid){
		this.table = this.db.list<Table>('Usuarios/' + uid + '/ingesta');
		return this.table.push(table);
	}

	UpdateTable(key, uid, table: Table){
		this.table = this.db.list<Table>('Usuarios/' + uid + '/ingesta');
		this.table.update(key, table);
	}

	private usuariosinfo = this.db.list<UserInfo>('Usuarios');
	private usuariosmacros = this.db.list<Macros>('Usuarios');
	private table = this.db.list<Table>('Usuarios');
  	private comidaslist = this.db.list<Comida>('Usuarios/Comidas');
}
