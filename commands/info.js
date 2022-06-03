const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('정보')
		.setDescription('캐릭터의 전투정보실 정보를 조회합니다.')
        .addStringOption((option)=>
            option
                .setName("닉네임")
                .setDescription("캐릭터의 닉네임")
                .setRequired(true)
        ),
	async execute(interaction) {
        const nickName = interaction.options.getString("닉네임");
        
        async function getHTML() {
			try {
				return await axios.get(encodeURI(`https://lostark.game.onstove.com/Profile/Character/${nickName}`));
			} catch (error) {
				console.error(error);
		}
		};

        await getHTML().then(html=>{
			const $ = cheerio.load(html.data);
            if($("div.profile-attention span:nth-child(2)").text() === "캐릭터명을 확인해주세요." || $("div.level-info2__expedition").text().split("Lv.")[1] === "0.00"){
                interaction.reply({content: "`"+nickName+"`"+"이라는 캐릭터는 없습니다", allowedMentions: {repliedUser: false}});
                return;
            }
            const server = $("span.profile-character-info__server").text().substring(1);
            const jickup = $("img.profile-character-info__img").attr("alt");
            const expeditionLevel = $("div.level-info__expedition").text().split("Lv.")[1];
            const combatLevel = $("div.level-info__item").text().split("Lv.")[1];
            const itemLevel = $("div.level-info2__expedition").text().split("Lv.")[1];
            const title = $("div.game-info__title").find("span:nth-child(2)").text();
            const guild = $("div.game-info__guild").find("span:nth-child(2)").text();
            const pvpLevel = $("div.level-info__pvp").find("span:nth-child(2)").text();
            const wisdomLevel = $("div.game-info__wisdom").find("span:nth-child(2)").text();
            const wisdomName = $("div.game-info__wisdom").find("span:nth-child(3)").text();
            const attack = $("div.profile-ability-basic").find("ul li:nth-child(1) span:nth-child(2)").text();
            const hp = $("div.profile-ability-basic").find("ul li:nth-child(2) span:nth-child(2)").text();
            const crit = $("div.profile-ability-battle").find("ul li:nth-child(1) span:nth-child(2)").text();
            const specialization = $("div.profile-ability-battle").find("ul li:nth-child(2) span:nth-child(2)").text();
            const domination = $("div.profile-ability-battle").find("ul li:nth-child(3) span:nth-child(2)").text();
            const swiftness = $("div.profile-ability-battle").find("ul li:nth-child(4) span:nth-child(2)").text();
            const endurance = $("div.profile-ability-battle").find("ul li:nth-child(5) span:nth-child(2)").text();
            const expertise = $("div.profile-ability-battle").find("ul li:nth-child(6) span:nth-child(2)").text();
            const abilityList = [];
            let abilityString = "";
            $("ul.swiper-slide").children("li").each(function(i, elem) {abilityList[i] = $(this).find("span").text();});
            for(idx = 0; idx < abilityList.length; idx++){ abilityString += abilityList[idx] + "\n"; }
            const embed = new MessageEmbed()
            .setColor("#D0F5A9")
            .setThumbnail($("img.profile-character-info__img").attr("src"))
            .setTitle(nickName)
            .addFields(
                {name: "**캐릭터 정보**", value: "`서  버`: "+server+"\n"+"`길  드`: "+guild+"\n"+"`클래스`: "+jickup+"\n"+"`칭  호`: "+title+"\n"+"`PVP 급`: "+pvpLevel, inline: true},
                {name: "\u200b", value: "\u200b", inline: true},
                {name: `**레벨 정보**`, value: "`캐릭터`: "+combatLevel+"\n"+"`아이템`: "+itemLevel+"\n"+"`원정대`: "+expeditionLevel+"\n"+"`영  지`: "+wisdomLevel+" "+wisdomName, inline: true}
            )
            .addField('\u200b', '\u200b')
            .addFields(
                {name: "**캐릭터 특성**", value: "`공격력`: "+attack+"\n"+"`생명력`: "+hp+"\n"+"`치  명`: "+crit+"\n"+"`특  화`: "+specialization+"\n"+"`제  압`: "+domination+"\n"+"`신  속`: "+swiftness+"\n"+"`인  내`: "+endurance+"\n"+"`숙  련`: "+expertise, inline: true},
                {name: "**각인**", value: abilityString, inline: true}
            )
            interaction.reply({embeds: [embed], allowedMentions: {repliedUser: false}});
        });
    }
};