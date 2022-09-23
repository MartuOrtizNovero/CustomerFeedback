const axios = require('axios');
const { App } = require('@slack/bolt');

const slackConfiguration = require('../slack_configuration.json') //Estamos requieriendo las variables de entorno

const app = new App({// Inicialidando la App
    token: slackConfiguration.SLACK_BOT_TOKEN,
    signingSecret: slackConfiguration.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: slackConfiguration.SLACK_APP_TOKEN,
    // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
    // you still need to listen on some port!
    port: process.env.PORT || 3000
});

app.message('hello', async ({ message, say }) => {// Metodo que responde con un saludo a HELLO!
    // say() sends a message to the channel where the event was triggered
    //await say(`Hey there <@${message.user}>!`);
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
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
});

// Listens to incoming messages that contain "hello"
(async () => {
    // Start your app
    await app.start();

    console.log('⚡️ Bolt app is running!');
})();


//tocken uno xapp-1-A0430GGP0SE-4121135069203-e5a52d535bdb97571eb1cf56aa0528d4d198da0577e0f3a45aa8c6452142765f
// tocken dos xapp-1-A0430GGP0SE-4121145490099-5777c8354d4d110fadb1d0cb48ed4cfd96a2380c47f86b446e8dd429a333558f


// Find conversation ID using the conversations.list method

async function findConversation(name) {// Metodo que recibe los canales publicos del usuario para tener info de los canales
    // console.log('NOMBRE CANAL',name)
    try {
        // Call the conversations.list method using the built-in WebClient
        const result = await app.client.conversations.list({
            // The token you used to initialize your app
            token: slackConfiguration.SLACK_BOT_TOKEN
        });

        for (const channel of result.channels) {
            if (channel.name === name) {
                conversationId = channel.id;

                // Print result
                console.log("Found conversation ID: " + conversationId);
                // Break from for loop
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

// Find conversation with a specified channel `name`
findConversation("general");// DAR POSIBILIDAD DE ELEGIR EL CANAL QUE DESEA PUBLICAR POR EL FRONT


//Post a message to a channel your app is in using ID and message text

async function publishMessage(id, text) {// METODO PARA PUBLICAR MENSAJES 
    try {
        //Call the chat.postMessage method using the built-in WebClient
        const result = await app.client.chat.postMessage({
            //The token you used to initialize your app
            token: slackConfiguration.SLACK_BOT_TOKEN,
            channel: id,
            text: text
            //You could also use a blocks[] array to send richer content
        });

        // Print result, which includes information about the message (like TS)
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}

publishMessage("C0430DSS49Y", "Hello world :tada:");



//CON ESTE METODO INTENTO SACAR EL ACCES TOCKEN DEL USUARIO Y DAR AUTORIZACION POR PARTE DEL USUARIO, FALTA TERMINAR
getAuth().catch(err => console.log(err));

async function getAuth() {

    // let code = request.queryParams.code
    const url = "https://slack.com/api/oauth.access";
    const res = await axios.post(url, {
        client_id: '4095852945846.4102560782898',
        client_secret: '958b4300f20888eeeb880f49e545e3e6',
        //  code : code FALTA RECIBIR ESTE CODIGO DE LOS QUERY PARAMS
    });
    console.log(res)
}




"https://slack.com/api/oauth.access"

// CODIGO DEL BOTON PARA AGREGAR A LA PAGINA
//<a href="https://slack.com/oauth/v2/authorize?client_id=4095852945846.4102560782898&scope=channels:history,chat:write,groups:history,im:history,incoming-webhook,mpim:history,channels:read&user_scope="><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

// LINK DE LA URL PARA REALIZAR AUTORIZACION: (LINK DE REDIRECCION PARA AUTORIZACION)
//https://slack.com/oauth/v2/authorize?client_id=4095852945846.4102560782898&scope=channels:history,chat:write,groups:history,im:history,incoming-webhook,mpim:history,channels:read&user_scope=


