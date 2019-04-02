import { Usuario } from './usuario';

export class Usuarios{

    private lista:Usuario[] = [];

   /**
    * Funcion para agrefar un usuario a la lista de usuarios
    * @param usuario 
    */
    public agregar(usuario:Usuario) {
        this.lista.push(usuario);
    }

    /**
     * Funcion para devolver los usuarios activos 
     * OJO EN EL CHAT
     */
    public getLista(){

        // let listaTemporal = this.lista.filter((usuario:any)=> usuario.nombre !== "sin nombre");
        let listaTemporal = this.lista.filter((usuario)=>{
            // if(usuario.nombre != 'sin nombre'){
                return usuario;
            // }
        })
        return listaTemporal
    }

    /**
     * Actualiza el nombre de un usuario en la lista de usuarios dado su id de maquina
     * @param id 
     * @param nombre 
     */
    public actualizarNombre(id:string, nombre:string){
        for(let usuario of this.lista){
            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }
    }

    /**
     * Funcion que devuelve un usuario dado su id
     * @param id 
     */
    public getUsuario(id:string){
        for(let usuario of this.lista){
            if(usuario.id === id){
               return usuario;
            }
        }
    }

    public borrarUsuario(id:string){
        this.lista = this.lista.filter((usuario)=>{
            if(usuario.id != id){
                return usuario;
            }
        })
    }
}