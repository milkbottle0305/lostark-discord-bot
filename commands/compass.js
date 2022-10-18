const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require("axios");
const cheerio = require("cheerio");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('나침반')
		.setDescription('오늘 이용가능한 프로키온의 나침반 스케줄 정보를 조회합니다.'),
	async execute(interaction) {
        
        await interaction.reply("현재 서비스를 중지한 상태입니다.");
        // const getHtml = async() => {
        //     try {
        //         return await axios.get("https://www.loawa.com/")
        //     } catch (error){
        //         console.error(error);
        //     }
        // }

        // await getHtml()
        //     .then(html => {
        //     const $ = cheerio.load(html.data);
            
        //     let info_island = [];
        //     let info_contents = [];
        //     let All_contents = ["유령선", "카오스게이트", "필드 보스"];
        //     const $IslandList = $("ul.today-quest-list").children("li.list");
        //     const $ContentList = $("ul.item-list").children("li.list");

        //     $IslandList.each(function(i, elem){
        //         info_island[i] = {
        //             name : $(this).find('h4.island-name span').text(),
        //             reword : $(this).find('h5.lang-text').text()
        //         }
        //     })

        //     $ContentList.each(function(i, elem){
        //         for(var i = 0; i < All_contents.length; i++){
        //             if($(this).find("h4.item-title span").text() === All_contents[i]){
        //                 info_contents.push($(this).find("h4.item-title span").text());
        //             }
        //         }
        //     })

        //     let island_print = "";
        //     for(var i = 0; i < info_island.length; i++){
        //         let rewordImage = "";
        //         if(info_island[i].reword === "카드"){
        //             rewordImage = "<:cardpack:976389392702791710>"
        //         } else if(info_island[i].reword === "골드"){
        //             rewordImage = "<:golds:976389688132788245>"
        //         } else if(info_island[i].reword === "주화"){
        //             rewordImage = "<:piratecoin:976389403662508092>"
        //         } else if(info_island[i].reword === "실링"){
        //             rewordImage = "<:shillings:976389357558710292>"
        //         }
        //         island_print += `${info_island[i].name}: ${info_island[i].reword} ${rewordImage}\n`;
        //     }

        //     let content_print = "";

        //     for(var i = 0; i < info_contents.length; i++){
        //         content_print += `${info_contents[i]}\n`;
        //     }

        //     if(!content_print){
        //         content_print = "오늘은 이용가능한 컨텐츠가 없어요";
        //     }

        //     const termembed = new MessageEmbed()
        //     .setColor('#008B8B')
        //     .setTitle('프로키온의 나침반')
        //     .setDescription(`오늘 이용가능한 컨텐츠 정보`)
        //     .addFields(
        //         {name: "모험섬", value: island_print, inline: true},
        //         {name: "오늘의 콘텐츠", value: content_print, inline: true}    
        //     )

        //     interaction.reply({ embeds: [termembed], allowedMentions: {repliedUser: false} });
        // })
	},
};
