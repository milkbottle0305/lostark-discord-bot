const { SlashCommandBuilder } = require('@discordjs/builders');
const open = require('open');
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('로아와')
		.setDescription('캐릭터의 로아와 정보를 브라우저로 엽니다.')
        .addStringOption((option)=>
            option
                .setName("닉네임")
                .setDescription("캐릭터의 닉네임")
                .setRequired(true)
        ),
	async execute(interaction) {
        async function getHTML() {
			try {
				return await axios.get(encodeURI(`https://lostark.game.onstove.com/Profile/Character/${interaction.options.getString("닉네임")}`));
			} catch (error) {
				console.error(error);
		}
		};
        await getHTML().then(html=>{
            const $ = cheerio.load(html.data);
            if($("div.profile-attention span:nth-child(2)").text() === "캐릭터명을 확인해주세요." || $("div.level-info2__expedition").text().split("Lv.")[1] === "0.00"){
                interaction.reply({content: "`"+interaction.options.getString("닉네임")+"`"+"이라는 캐릭터는 없습니다", allowedMentions: {repliedUser: false}});
                return;
            }
            open(`https://loawa.com/char/${interaction.options.getString("닉네임")}`);
            interaction.reply({content: `${interaction.options.getString("닉네임")}의 로아와 정보로 이동합니다.`, allowedMentions: {repliedUser: false}});
        });
        
	},
};