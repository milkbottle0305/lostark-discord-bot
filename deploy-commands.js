const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildIds, token } = require("./config.json");

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const commands = [];

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}
	
const rest = new REST({ version: "9" }).setToken(token);


(async () => {
	guildIds.map(async (guildId) => {
		try {
			await rest.put(
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: {} },
			);
			console.log(`${guildId}서버 등록 성공`);
		} catch (error) {
			console.error(error);
		}
	});

	// try {
	// 	await rest.put(
	// 		Routes.applicationCommands(clientId),
	// 		{ body: commands },
	// 	);
	// 	console.log('글로벌 커맨드 등록 성공');
	// } catch (error) {
	// 	console.error(error);
	// }
})();