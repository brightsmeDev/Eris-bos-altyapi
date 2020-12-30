const Eris = require('eris');
const { token, prefix } = require('./config.js');
const client = new Eris.Client(token);
const fs = require('fs');


client.commands = new Eris.Collection();
client.aliases = new Eris.Collection();

const fileCommand = fs.readdirSync(`./komutlar`)
.filter(file => file.endsWith(".js"));
for(const file of fileCommand) {
    const command = require(`./komutlar/${file}`);
    client.commands.set(command.config.nameID, command);
    for (const ali of command.config.aliases) {
        client.aliases.set(ali, command)
      }
    console.log(`Komut yükleniyor: ${command.config.nameID} (${file})`);
}

client.on("ready", async => {
    console.log('Bot Hazır!')
    client.editStatus('idle', {
        name: "❤️ Developer ❤️ brightsme#1704 ❤️",
        type: 2
    })
})

client.on("messageCreate", (msg) => {
    let p = prefix

    if(!msg.content.startsWith(p)) return;
    let command = msg.content.split(" ");
    let args = command.slice(1);
    let cmd = command[0];
  
    let cmdRun = client.commands.get(cmd.slice(p.length)) || client.aliases.get(cmd.slice(p.length))
    if(cmdRun) {
        cmdRun.execute(client, msg, args);
    } 
  })
  
client.connect();