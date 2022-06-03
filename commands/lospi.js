const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('시세')
		.setDescription('현재 100크리스탈 당 골드 시세를 조회합니다.'),
	async execute(interaction) {
        async function getHTML() {
			try {
				return await axios.get("https://www.mgx.kr/lostark/goldexchange/");
			} catch (error) {
				console.error(error);
		}
		};
        await getHTML().then(html=>{
            const $ = cheerio.load(html.data);
            const buyValue = $("div.price.buy span").text();
            const sellValue = $("div.price.sell span").text();
            const embed = new MessageEmbed()
            .setTitle("크리스탈 시세")
            .setDescription("100<:bluecrystal:952747773097295932>당 "+$("div.searched_time").text())
            .setColor("#CECEF6")
            .addFields(
                {name: "크리스탈 구매가", value: `${buyValue}<:gold:952804483237289994>`, inline: true},
                {name: "\u200b", value: "\u200b", inline: true},
                {name: "크리스탈 판매가", value: `${sellValue}<:gold:952804483237289994>`, inline: true}
            );
            interaction.reply({embeds: [embed], allowedMentions: {repliedUser: false}});
        });
        
	},
};