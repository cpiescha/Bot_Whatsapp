const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { EVENTS } = require('@bot-whatsapp/bot')



const flowPrincipal = addKeyword([EVENTS.WELCOME]) // Evento de bienvenida
    .addAnswer('🙌 Hola, bienvenido a Mercados Rodeoalto. Pregunta por nuestras ofertas.', null,async (ctx, { flowDynamic }) => {
        // Verificar si el usuario ya está registrado
        console.log(ctx)
        if(ctx.from == '573187832887'){
            console.log('usuario registrado')
            await flowDynamic([{body:`Ya estas registrado, tu numero es: ${ctx.from} y tu nombre es: ${ctx.pushName}`}])
        }
        else{
            await flowDynamic([{body:'Eres un usuario nuevo, Bienvenido.'}])}
    })
    .addAnswer('Escribe *Registrar* para registrate por favor')

    
    

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
