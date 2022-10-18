const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require("axios");
const cheerio = require("cheerio");

module.exports ={
    data: new SlashCommandBuilder()
        .setName('공략')
        .setDescription('로스트아크 인벤의 군단장 레이드 공략 글 정보를 소개합니다.')
        .addStringOption((option) =>
            option.setName('레이드')
                .setDescription('군단장 레이드 이름')
                .setRequired(true)
                .addChoice("발탄", "발탄")
                .addChoice("비아키스", "비아키스")
                .addChoice("쿠크세이튼", "쿠크세이튼")
                .addChoice("아브렐슈드", "아브렐슈드")),
    async execute(interaction){
        const rade_name = interaction.options.getString('레이드');

        const getHtml = async() => {
            try {
                return await axios.get("https://lostark.inven.co.kr/")
            } catch (error){
                console.error(error);
            }
        }

        await getHtml()
            .then(html => {
                const $ = cheerio.load(html.data);

                const $radeList = $("div.menu_item01 div.item_body ul.list").children("li.row");

                let rade_info = [];
                let rade_url = [];
              
                $radeList.each(function(i, elem){
                    if($(this).text().indexOf(rade_name) != -1){
                      rade_info.push($(this).text());
                      rade_url.push($(this).find('a').attr('href'));
                    }
                })

                let rade_print = "";

                for(var i = 0; i < rade_info.length; i++){
                    rade_print += `[${rade_info[i]}](${rade_url[i]})\n`;
                }

                const guideembed = new MessageEmbed()
                .setColor('#6FF3E0')
                .setTitle("공략 정보")
                .setDescription(rade_print)
    
                interaction.reply({ embeds: [guideembed], allowedMentions: {repliedUser: false} });
            })
    }
}