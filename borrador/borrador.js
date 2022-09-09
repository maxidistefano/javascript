let nombreIngresado = prompt ("ingresar nombre");

if ((nombreIngresado !="") && ((nombreIngresado =="EMA") || (nombreIngresado =="ema"))){
    alert ("Hola Ema");
}
else{
    alert ("Error: Ingresar nombre valido");
}

let entrada = prompt ("Ingresar un dato");
//repetimos con while hasta que el usuario ingresa "ESC"
 while (entrada !="ESC"){
    alert ("El usuario ingreso" + entrada);
    //volvemos a solicitar un dato la proxima iteraicon se evalua si no es ESC
    entrada = prompt ("ingresar otro dato");
 }
