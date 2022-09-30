
/** variables constantes para las funciones */

const limiteDeImagenes=10;

const edadDeRegistro=18;

const limiteDefinitivoDeInformacionTextual=1000;

const expresionRegular={
  nombre:/^[a-z]+( [a-z]+)*$/,        /** expresion regular mas simple /^[a-z\s]*$/*/
  apellido:/^[a-z]+( [a-z]+)*$/,      /** expresion regular mas simple /^[a-z\s]*$/*/
  email:/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
  password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,               // expresion regular para caracteres especiales  (?=.*[!@#\$%\^&\*])
  archivoImagen:/\.(jpg|jpeg|png|webp|avif|gif|svg)$/,  
//  url:/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
//  telefono:/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,

};
const expresionRegularLongitud={
  nombre:[1,30],
  apellido:[1,30],
  email:[1,50],
  password:[8,50],
};




//onkeypress onkeyup




/** eventos de carga */


window.onload=function(){
  eventosParaFormularios();
}

function eventosParaFormularios(){
  
//  document.getElementById('form_de_registro').style='display:none;';
//  document.getElementById('form_de_iniciar_sesion').style='display:none;'; 

  document.getElementById("iniciar_sesion_link").addEventListener("click",function(){
    document.getElementById('form_de_registro').style='display:none;';
    document.getElementById('form_de_iniciar_sesion').style='display:initial;';  
  });
  document.getElementById("nuevo_registro_link").addEventListener("click",function(){
    document.getElementById('form_de_iniciar_sesion').style='display:none;';
    document.getElementById('form_de_registro').style='display:initial;'; 
  });
  for (let a=0;document.getElementsByClassName("form_ocultar").length>a;a++){
    document.getElementsByClassName("form_ocultar")[a].addEventListener("click",function(){
      document.getElementById('form_de_registro').style='display:none;';
      document.getElementById('form_de_iniciar_sesion').style='display:none;';
    });
  }

}

/** funciones de tratameinto de informacion */



const validacionDeInput=(texto,patron,limite)=>{
  /** 
   texto: informacion en string
   patron: expresion regular que debe cumplir texto
   limite: la longitud (Array [minimo,maximo]) que debe cumplir el texto (undefined determina que no hay un limite fijo)
  */
  return (limite==undefined ? (patron.test(texto)) : (patron.test(texto) && longitudAdecuada(texto,limite)));
};

const longitudAdecuada=(texto,limite)=>{
  if (limite.constructor==Array && limite.length==2){
    if (texto.length>=limite[0] && texto.length<=limite[1]){
      return true;
    } else if (texto.length<=limite[1] && limite[0]==undefined){
      return true
    } else if (texto.length>=limite[0] && limite[1]==undefined){
      return true
    }
  } else if (limite.constructor==Number){
    if (texto.length>=limite){
      return true;
    }
  } else if (limite==undefined){
    return true;
  }
  return false;
};

const validarEdad=function(dataDate){

  /** dataDate: [año,mes,dia] */
  /** 
      getFullYear() => año del calendiario
      getMonth()+1 => mes del calendario
      getDate() => dia del calendario
  */      
 
  let fechaActual=new Date();
  if (dataDate[0]<1900){return false;}
  else if ((fechaActual.getFullYear()-dataDate[0])<edadDeRegistro){return false;}
  else if ((fechaActual.getFullYear()-dataDate[0])==edadDeRegistro){
    if ((fechaActual.getMonth()+1)<dataDate[1]){return false;}
    else if ((fechaActual.getMonth()+1)==dataDate[1]){
      if ((fechaActual.getDate())<dataDate[2]){return false;}
    }
  }      
  return true;
};


function restablecerFormulario(formularioActual){
  if (confirm('¿Desea eliminar los datos ingresados?')){

    let informacion=new Array(); 
    let formulario=formularioActual.name;
    informacion.push(document.forms[formulario]["nombre"]);
    informacion.push(document.forms[formulario]["apellido"]);
    informacion.push(document.forms[formulario]["fecha_nacimiento"]);
    informacion.push(document.forms[formulario]["nombre_usuario"]);
    informacion.push(document.forms[formulario]["email"]);
    informacion.push(document.forms[formulario]["password_1"]);
    informacion.push(document.forms[formulario]["password_2"]);
    var avisoElementos=document.forms[formulario].getElementsByClassName("aviso");
    for (let i=0;i<informacion.length;i++){
      avisoElementos[(i*2)+1].innerHTML="";
 //       informacion[i].style.border="solid 2px black";informacion[i].style.color="black";
    }
    return true;
  } 
  return false;
}




function validarFormularioDinamico(formulario) {
  for (let i=0;i!=formulario.length;i++){
    if (formulario[i].name!="" ){  
      alert(formulario[i].name);

      let clave=formulario[i].name;
      let texto=formulario[i].value;      
      let patron=expresionRegular[clave];
      let limite=expresionRegularLongitud[clave];
      if (validarFormularioDinamicoLlavesEspeciales(texto,clave)){
        alert("fecha mala");
      } else if (!validacionDeInput(texto,patron,limite)){
        alert("mal en "+clave)
      }

    }
  }
}

function validarFormularioDinamicoLlavesEspeciales(texto,clave){
  if (clave=="fecha_nacimiento"){
    return validarEdad(texto.split("-"));
  } else if (clave=="fecha_nacimiento"){
    return validarEdad(texto.split("-"));
  } else {
    return false;
  }
}


function inputIncorrecto(formulario,elemento){

}    




function validarFormularioDeRegistro(formularioActual) {    

    let informacion=new Array(); 
    let formulario=formularioActual.name;
    informacion.push(document.forms[formulario]["nombre"]);
    informacion.push(document.forms[formulario]["apellido"]);
    informacion.push(document.forms[formulario]["fecha_nacimiento"]);
    informacion.push(document.forms[formulario]["nombre_usuario"]);
    informacion.push(document.forms[formulario]["email"]);
    informacion.push(document.forms[formulario]["password_1"]);
    informacion.push(document.forms[formulario]["password_2"]);
    

    
    
    var cumplimiento = true;
    let styleDeError="border:solid 2px red;color:red";
    var avisoElementos=document.forms[formulario].getElementsByClassName("aviso");
    for (let i=0;i<informacion.length;i++){
   //   informacion[i].style.border="solid 2px black";informacion[i].style.color="black";
      avisoElementos[(i*2)+1].innerHTML="";
    }

    if (!validacionDeInput(informacion[0].value,expresionRegular.nombre,[1,20])  /** || validacion php */) {
      cumplimiento = false;
      
      if (informacion[0].value==""){
        avisoElementos[1].innerHTML="Sin datos";
      } else if (!validacionDeInput(informacion[0].value,expresionRegular.nombre)){
        avisoElementos[1].innerHTML="Error en los caracteres";
      } else if (!longitudAdecuada(informacion[0].value,[1,20])){
        avisoElementos[1].innerHTML="Limite de caracteres alcanzado";
      } else {
        avisoElementos[1].innerHTML="";
      }
 //     informacion[0].style=styleDeError;
    } 
    if (!validacionDeInput(informacion[1].value,expresionRegular.apellido,[1,20])  /** || validacion php */) {
      cumplimiento = false;

      if (informacion[1].value==""){
        avisoElementos[3].innerHTML="Sin datos";
      } else if (!validacionDeInput(informacion[1].value,expresionRegular.apellido)){
        avisoElementos[3].innerHTML="Error en los caracteres";
      } else if (!longitudAdecuada(informacion[1].value,[1,20])){
        avisoElementos[3].innerHTML="Limite de caracteres alcanzado";
      } else {
        avisoElementos[3].innerHTML="";
      }
 //     informacion[1].style=styleDeError;
    } 
    if (informacion[2].value == "" || !validarEdad(informacion[2].value.split("-")) /** || validacion php */) {
      cumplimiento = false;
      if (informacion[2].value==""){
        avisoElementos[5].innerHTML="Sin datos";
      } else if (!validarEdad(informacion[2].value.split("-"))){
        avisoElementos[5].innerHTML="Fecha no valida";
      } else {
        avisoElementos[5].innerHTML="";
      }

 //     informacion[2].style=styleDeError;
    } 
    if (!longitudAdecuada(informacion[3].value,[1,20]) /** || validacion php */) {
      cumplimiento = false;

      if (informacion[3].value==""){
        avisoElementos[7].innerHTML="Sin datos";
      } else if (!longitudAdecuada(informacion[3].value,[1,20])){
        avisoElementos[7].innerHTML="Limite de caracteres alcanzado";
      } else {
        avisoElementos[7].innerHTML="";
      }
 //    informacion[3].style=styleDeError;
    } 
    if (!validacionDeInput(informacion[4].value,expresionRegular.email) /** || validacion php */) {
      cumplimiento = false;

      if (informacion[4].value==""){
        avisoElementos[9].innerHTML="Sin datos";
      } else if (!validacionDeInput(informacion[4].value,expresionRegular.email,[1,20])){
        avisoElementos[9].innerHTML="Correo electronico invalido";
      } else if (!longitudAdecuada(informacion[4].value,[1,20])){
        avisoElementos[9].innerHTML="Limite de caracteres alcanzado";
      } else {
        avisoElementos[9].innerHTML="";
      }
 //   informacion[4].style=styleDeError;
    } 
    if (!validacionDeInput(informacion[5].value,expresionRegular.password,[8,20]) /** || validacion php */) {
      cumplimiento = false;

      if (informacion[5].value==""){
        avisoElementos[11].innerHTML="Sin datos";
      } else if (!validacionDeInput(informacion[5].value,expresionRegular.password)){
        avisoElementos[11].innerHTML="Contraseña invalida";
      } else if (!longitudAdecuada(informacion[5].value,[0,7])){
        avisoElementos[11].innerHTML="Se requieren 8 caracteres minimo";
      } else if (!longitudAdecuada(informacion[5].value,[8,20])){
        avisoElementos[11].innerHTML="Limite de caracteres alcanzado";
      } else {
        avisoElementos[11].innerHTML="";
      }
 //   informacion[5].style=styleDeError;
    } 
    if (!validacionDeInput(informacion[6].value,expresionRegular.password,8) || informacion[5].value!=informacion[6].value /** || validacion php */) {
      cumplimiento = false;

      if (informacion[6].value==""){
        avisoElementos[13].innerHTML="Sin datos";
      } else if (!validacionDeInput(informacion[6].value,expresionRegular.password)){
        avisoElementos[13].innerHTML="Contraseña invalida";
      } else if (longitudAdecuada(informacion[5].value,[0,7])){
        avisoElementos[13].innerHTML="Se requieren 8 caracteres minimo";
      } else if (!longitudAdecuada(informacion[5].value,[8,20])){
        avisoElementos[13].innerHTML="Limite de caracteres alcanzado";
      } else if (informacion[5]!=informacion[6]){
        avisoElementos[13].innerHTML="No coinciden las contraseñas";
      } else {
        avisoElementos[13].innerHTML="";
      }
 //   informacion[6].style=styleDeError;
    } 
    
    return cumplimiento;
  }



  function validarFormularioDeIngreso() {    

    let informacion=new Array(); 
    let formulario="formulario_de_iniciar_sesion";
    informacion.push(document.forms[formulario]["email"]);
    informacion.push(document.forms[formulario]["password"]);
    
    var cumplimiento = true;
    let styleDeError="border:solid 2px red;color:red";
    for (let i=0;i<informacion.length;i++){
      informacion[i].style.border="solid 2px black";informacion[i].style.color="black";
    }
    if (!validacionDeInput(informacion[0].value,expresionRegular.email)  /** || validacion php */) {
      cumplimiento = false;
      informacion[0].style=styleDeError;
    } 
    else if (!validacionDeInput(informacion[1].value,expresionRegular.password,8)  /** || validacion php */) {
      cumplimiento = false;
      informacion[1].style=styleDeError;
    } 
    return cumplimiento;
  }


  function validarImagenes(inputFiles){
    let archivos=inputFiles.files;
    if (archivos.length==0 && archivos.length<limiteDeImagenes){
      return false;
    } else {
      for (let i=0; i<archivos.length;i++) {
        if (!validacionDeInput(archivos[i].name,expresionRegular.archivoImagen)){
          return false;
        }
      }
    return true;
    }
  }




















  /** 
  pruebas de input imagenes
  
  https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_type_file */

  /** 
   
   <!DOCTYPE html>
<html>
<body>

<h1>Show File-select Fields</h1>

<h3>Show a file-select field which allows only one file to be chosen:</h3>
<form action="/action_page.php">
  <label for="myfile">Select a file:</label>
  <input type="file" id="myfile" name="myfile"><br><br>
  <input type="submit">
</form>

<h3>Show a file-select field which allows multiple files:</h3>
<form name="a" action="/action_page.php" onsubmit="return validar()">
  <label for="myfile">Select files:</label>
  <input type="file" id="myfile" name="myfile" multiple><br><br>
  <input type="submit">
</form>

</body>
</html>

<script>

    function validar(){
        const regExp=/\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
        let fileInput = document.forms["a"]['myfile'].files;
        alert(fileInput.length)
            // Loop fileInput.files
            for (let i=0; i<fileInput.length ;i++) {
                // Perform action on one file
                let fileName=(fileInput[i].name)
                
                alert(regExp.test(fileName))
            }
            // Only one file available
    }

</script>


  */