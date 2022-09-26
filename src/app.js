const axios = require('axios');
const { App } = require('@slack/bolt');

const slackConfiguration = require('../slack_configuration.json') //Estamos requieriendo las variables de entorno

const app = new App({// Inicialidando la App
    token: slackConfiguration.SLACK_BOT_TOKEN,
    signingSecret: slackConfiguration.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: slackConfiguration.SLACK_APP_TOKEN,
    // El Modo Socket no escucha en un puerto, pero en caso de que quieras que tu aplicación responda a OAuth,
    // ¡todavía necesitas escuchar en algún puerto!
    port: process.env.PORT || 3000
});

app.message('hello', async ({ message, say }) => {// Metodo que responde con un saludo a HELLO!
    // say() envía un mensaje al canal donde se activó el evento
    //espera say(`¡Hey there <@${message.user}>!`);
    await say({
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Hey there <@${message.user}>!`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Click Me"
                    },
                    "action_id": "button_click"
                }
            }
        ],
        text: `Hey there <@${message.user}>!`
    });
});

app.action('button_click', async ({ body, ack, say }) => {// Boton para realizar acciones
    // Reconocer la acción
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
});

// Escucha los mensajes entrantes que contienen "hello"
(async () => {
    // Start your app
    await app.start();

    console.log('⚡️ Bolt app is running!');
})();


//tocken uno xapp-1-A0430GGP0SE-4121135069203-e5a52d535bdb97571eb1cf56aa0528d4d198da0577e0f3a45aa8c6452142765f
// tocken dos xapp-1-A0430GGP0SE-4121145490099-5777c8354d4d110fadb1d0cb48ed4cfd96a2380c47f86b446e8dd429a333558f


// Encuentra el ID de la conversación usando el método conversations.list

async function findConversation(name) {// Metodo que recibe los canales publicos del usuario para tener info de los canales
    // EN BASE A LOS QUE RECIBO MAS ABAJO SELECCIONO AL QUE QUIERO ENVIAR LOS MENSAJES: GENERAL
    // console.log('NOMBRE CANAL',name)
    try {
        // Llamar al método conversations.list utilizando el WebClient incorporado
        const result = await app.client.conversations.list({
           // El token que usaste para inicializar tu aplicación
            token: slackConfiguration.SLACK_BOT_TOKEN
        });

        for (const channel of result.channels) {
            if (channel.name === name) {
                conversationId = channel.id;

                // Imprimir el resultado
                console.log("Found conversation ID: " + conversationId);
                // Romper el bucle for
                // console.log(channel.name)
                break;
            }
            // console.log(channel)
        }
    }
    catch (error) {
        console.error(error);
    }
}

// Encontrar una conversación con un canal especificado `nombre`
findConversation("general");// DAR POSIBILIDAD DE ELEGIR EL CANAL QUE DESEA PUBLICAR POR EL FRONT


//Publicar un mensaje en un canal en el que esté tu aplicación utilizando el ID y el texto del mensaje

async function publishMessage(id, text) {// METODO PARA PUBLICAR MENSAJES 
    try {
      //Llamar al método chat.postMessage usando el WebClient incorporado
        const result = await app.client.chat.postMessage({
            //El token que has utilizado para inicializar tu aplicación
            token: slackConfiguration.SLACK_BOT_TOKEN,
            channel: id,
            text: text
            
        });

        // Imprime el resultado, que incluye información sobre el mensaje 
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}

publishMessage("C0430DSS49Y", "Hello world :tada:");// Aca esta especificado el canael GENERAL



//CON ESTE METODO INTENTO SACAR EL ACCES TOCKEN DEL USUARIO Y DAR AUTORIZACION POR PARTE DEL USUARIO, FALTA TERMINAR
/* getAuth().catch(err => console.log(err));

async function getAuth() { */

    // let code = request.queryParams.code
   /*  const url = "https://slack.com/api/oauth.access";
    const res = await axios.post(url, {
        client_id: '4095852945846.4102560782898',
        client_secret: '958b4300f20888eeeb880f49e545e3e6',
        //  code : code FALTA RECIBIR ESTE CODIGO DE LOS QUERY PARAMS
    }); */
    //console.log(res)
//}




"https://slack.com/api/oauth.access"

// CODIGO DEL BOTON PARA AGREGAR A LA PAGINA
//<a href="https://slack.com/oauth/v2/authorize?client_id=4095852945846.4102560782898&scope=channels:history,chat:write,groups:history,im:history,incoming-webhook,mpim:history,channels:read&user_scope="><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

// LINK DE LA URL PARA REALIZAR AUTORIZACION: (LINK DE REDIRECCION PARA AUTORIZACION)
//https://slack.com/oauth/v2/authorize?client_id=4095852945846.4102560782898&scope=channels:history,chat:write,groups:history,im:history,incoming-webhook,mpim:history,channels:read&user_scope=


