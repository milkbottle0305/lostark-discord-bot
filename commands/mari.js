const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('마리샵')
		.setDescription('현재 마리샵과 이전, 전전의 마리샵의 정보를 조회합니다.'),
	async execute(interaction) {
		const itemInfo = [];
		var isMaintainence = false;
		await axios.get("https://lostark.game.onstove.com").then(html=>{
			const $ = cheerio.load(html.data);
			textMaintainence = $("div.time_wraper").find("h3").text();
			timeMaintainence = $("strong#inspectionTime").text();
			console.log(timeMaintainence);
			if(textMaintainence == "예상 점검 완료 시간")
				isMaintainence = true;
		})
		if(!isMaintainence){
			const buttonsRow = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId("12time_ago")
						.setLabel("전전 마리샵 정보 조회")
						.setStyle("SECONDARY")
				)
				.addComponents(
					new MessageButton()
						.setCustomId("6time_ago")
						.setLabel("이전 마리샵 정보 조회")
						.setStyle("SECONDARY")
				)
				.addComponents(
					new MessageButton()
						.setCustomId("0time_ago")
						.setLabel("현재 마리샵 정보 조회")
						.setStyle("SECONDARY")
				);

			async function getHTML() {
				try {
					return await axios.get("https://lostark.game.onstove.com/Shop#mari");
				} catch (error) {
					console.error(error);
			}
			};
			await getHTML().then(html => {
				const $ = cheerio.load(html.data);
				const bodyList = $("ul.list-items").children("li");
				bodyList.each(function(i, elem) {
				itemInfo[i] = {
					name: $(this).find("span.item-name").text(),
					amount: $(this).find("span.amount").text()};
				});
				return itemInfo;
			});
			
			const embed = new MessageEmbed()
				.setTitle("마리샵 성장 추천 목록")
				.setColor("#FAA8F0")
				.setDescription("성장 추천");
			for(idx = 0; idx < 6; idx++) {
				embed.addField(`${(itemInfo[idx]).name}`, `${(itemInfo[idx]).amount}<:bluecrystal:952747773097295932>`, true); }
			embed.addField("\u200B",  "전투ㆍ생활 추천", false);
			for(idx = 18; idx < 24; idx++) {
				embed.addField(`${(itemInfo[idx]).name}`, `${(itemInfo[idx]).amount}<:bluecrystal:952747773097295932>`, true); }
			interaction.reply({ embeds: [embed], components: [buttonsRow], allowedMentions: {repliedUser: false}});

			const filter = (interaction) => { return interaction.customId === "12time_ago" || "6time_ago" || "0time_ago" ;};
			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000});
			collector.on("collect", async (interaction) => {
				if(interaction.customId === "12time_ago") {
					const embed = new MessageEmbed()
						.setTitle("마리샵 성장 추천 목록")
						.setColor("#FAA8F0")
						.setDescription("성장 추천");
					for(idx = 6; idx < 12; idx++) {
						embed.addField(`${(itemInfo[idx]).name}`, `${(itemInfo[idx]).amount}<:bluecrystal:952747773097295932>`, true); }
					embed.addField("\u200B",  "전투ㆍ생활 추천", false);
					for(idx = 24; idx < 30; idx++) {
						embed.addField(`${(itemInfo[idx]).name}`, `${(itemInfo[idx]).amount}<:bluecrystal:952747773097295932>`, true); }
					interaction.update({ embeds: [embed], components: [buttonsRow], allowedMentions: {repliedUser: false}});
				} else if(interaction.customId === "6time_ago"){
					const embed = new MessageEmbed()
						.setTitle("마리샵 성장 추천 목록")
						.setColor("#FAA8F0")
						.setDescription("성장 추천");
					for(idx = 12; idx < 18; idx++) {
						embed.addField(`${(itemInfo[idx]).name}`, `${(itemInfo[idx]).amount}<:bluecrystal:952747773097295932>`, true); }
					embed.addField("\u200B",  "전투ㆍ생활 추천", false);
					for(idx = 30; idx < 36; idx++) {
						embed.addField(`${(itemInfo[idx]).name}`, `${(itemInfo[idx]).amount}<:bluecrystal:952747773097295932>`, true); }
					interaction.update({ embeds: [embed], components: [buttonsRow], allowedMentions: {repliedUser: false}});
				} else if(interaction.customId === "0time_ago"){
					const embed = new MessageEmbed()
						.setTitle("마리샵 성장 추천 목록")
						.setColor("#FAA8F0")
						.setDescription("성장 추천");
					for(idx = 0; idx < 6; idx++) {
						embed.addField(`${(itemInfo[idx]).name}`, `${(itemInfo[idx]).amount}<:bluecrystal:952747773097295932>`, true); }
					embed.addField("\u200B",  "전투ㆍ생활 추천", false);
					for(idx = 18; idx <24; idx++) {
						embed.addField(`${(itemInfo[idx]).name}`, `${(itemInfo[idx]).amount}<:bluecrystal:952747773097295932>`, true); }
					interaction.update({ embeds: [embed], components: [buttonsRow], allowedMentions: {repliedUser: false}});
				}
			});
		}
		else{
			const embed = new MessageEmbed()
			.setTitle("현재 로스트아크가 점검중입니다.")
			.setColor("#FAA8F0")
			.setDescription(`예상 점검 시간: ${timeMaintainence}`);
			interaction.reply({ embeds: [embed], allowedMentions: {repliedUser: false} });
		}
	},
};