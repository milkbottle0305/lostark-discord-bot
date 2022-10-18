const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request-promise");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('나침반')
		.setDescription('오늘 이용가능한 프로키온의 나침반 스케줄 정보를 조회합니다.'),
	async execute(interaction) {
        const getHtml = async() => {
            try {
                return await axios.get("https://www.loawa.com/")
            } catch (error){
                console.error(error);
            }
        }

        await getHtml()
            .then(html => {
            const $ = cheerio.load(html.data);
            
            let info_island = [];
            let info_contents = [];
            let All_contents = ["유령선", "카오스 게이트"];
            const $ContentList = $("ul.item-list").children("li.list");        

            $ContentList.each(function(i, elem){
                for(var i = 0; i < All_contents.length; i++){
                    if($(this).find("h4.item-title span").text() === All_contents[i]){
                        info_contents.push($(this).find("h4.item-title span").text());
                    }
                }
            })

            const $Bosscontent = $('div.main-inner-box ul.item-list').children('li'.list);
            $Bosscontent.each(function(i, elem){
               if($(this).find("h4.item-title").text() == "모아케"){
                 info_contents.push("필드 보스");
               }
            })

            let content_print = "";

            for(var i = 0; i < info_contents.length; i++){
                content_print += `${info_contents[i]}\n`;
            }

            if(!content_print){
                content_print = "오늘은 이용가능한 컨텐츠가 없어요";
            }

            //api 출처: 로학원생
            url = "http://152.70.248.4:5000/adventureisland/";

            request(url, function(err, res, body){
                if(err){
                    throw err;
                }
                let island_data = JSON.parse(body);
                
                for(var i = 0; i < island_data.Island.length; i++){
                    info_island[i] = {
                        name : island_data.Island[i].Name,
                        reward : island_data.Island[i].Reward
                    }
                }
            }).then(function(){
                let island_print = "";
                for(var i = 0; i < info_island.length; i++){
                    let rewardImage = "";
                    if(info_island[i].reward === "카드"){
                        rewardImage = "<:cardpack:1031605841507389552>"
                    } else if(info_island[i].reward === "골드"){
                        rewardImage = "<:gold:1031603945681989653>"
                    } else if(info_island[i].reward === "주화"){
                        rewardImage = "<:piratecoin:1031609998352064602>"
                    } else if(info_island[i].reward === "실링"){
                        rewardImage = "<:shilling:1031609486651179148>"
                    }
                    island_print += `${info_island[i].name}: ${info_island[i].reward} ${rewardImage}\n`;
                }
    
                const compassembed = new MessageEmbed()
                .setColor('#008B8B')
                .setTitle('프로키온의 나침반')
                .setDescription(`오늘 이용가능한 컨텐츠 정보`)
                .addFields(
                    {name: "모험섬", value: island_print, inline: true},
                    {name: "오늘의 콘텐츠", value: content_print, inline: true}    
                )
    
                interaction.reply({ embeds: [compassembed], allowedMentions: {repliedUser: false} });
            })    
        })
	},
};
