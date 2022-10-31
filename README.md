//------------------------------------Integracion con SLACK - Cfeedback--------------------------------------------------------//

En slack_configuration.json estan las variables de entorno que hay que COMPLETAR creando una nueva Aplicacion de Slack
te va a ir dando los diferentes tokens para funcionar.

Posicionados en la carpeda src corremos node app.js 

En app se encuentra todo el codigo:

1) Primero inicializamos la App
2) Con app.message manda un mensaje prederminado `Hey there <@${message.user}>!`
3) Con app.action se crea un boton que en principio no tiene ninguna funcionalidad
4) Con findConversation(name) Encuentra el ID de la conversación usando el método conversations.list.
 Metodo que recibe los canales publicos del usuario para tener info de los canales. EN BASE A LOS QUE RECIBO MAS ABAJO SELECCIONO AL QUE QUIERO ENVIAR LOS MENSAJES
5) Con publishMessage() Por un lado encontramos ROTATE URL --> PARA ACTUALIZAR EL TOKEN, debido que este se vence cada 12 hs.
Es la funcion que envia el mensaje predeterminado por Cfeedback
6) Con la ultima funcion que esta comentada intento sacar el acces tocken del usuario y dar autorizacion por parte del usuario.
En index.html se encuentra la la visualizacion del boton que te proporciona slack el cual intente vincularlo con esta utlima funcion.

Link de donde fui sacando informacion
https://slack.dev/bolt-js/tutorial/getting-started
https://api.slack.com/docs/slack-button
