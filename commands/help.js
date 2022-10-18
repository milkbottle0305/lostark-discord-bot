const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('도움')
		.setDescription('롸!봇의 명령어에 대한 설명입니다.')
        .addStringOption((option)=>
            option
                .setName("명령어")
                .setDescription("명령어의 설명 조회")
                .setRequired(false)
        ),
	async execute(interaction) {
        const helpCommand = interaction.options.getString("명령어");
        if(helpCommand === null) {
            const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('롸!봇 사용법')
            .addField('/도움', '명령어 설명 및 목록', true)
            .addField('/도움 <명령어>', '명령어 상세 설명', true)
            .addField('/마리샵', '마리샵 정보 조회', true)
            .addField('/경매', '경매 분배금 계산', true)
            .addField('/정보 <닉네임>', '전투정보실 조회', true)
            .addField('/로아와 <닉네임>', '로아와 조회', true)
            .addField('/나침반', '사용불가', true)
            .addField('/용어 <단어>', '로스트아크 용어 설명', true);
            await interaction.reply({embeds: [helpEmbed], allowedMentions: {repliedUser: false}});
        } else if(helpCommand === "도움") {
            const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`/도움 <명령어> 사용방법`)
            .setDescription(`<명령어>에 해당하는 명령어의 사용법을 알 수 있습니다.`);
            await interaction.reply({embeds: [helpEmbed], allowedMentions: {repliedUser: false}});
        } else if(helpCommand === "마리샵") {
            const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`/마리샵 사용방법`)
            .setDescription(`현재 마리샵과 이전, 전전의 마리샵의 정보를 조회합니다.`);
            await interaction.reply({embeds: [helpEmbed], allowedMentions: {repliedUser: false}});
        } else if(helpCommand === "경매") {
            const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`/경매 <경매가> <인원> 사용방법`)
            .setDescription(`경매 분배금을 계산해서 이득 입찰금을 조회합니다.`);
            await interaction.reply({embeds: [helpEmbed], allowedMentions: {repliedUser: false}});
        } else if(helpCommand === "정보") {
            const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`/정보 <닉네임> 사용방법`)
            .setDescription(`<닉네임>에 해당하는 캐릭터의 전투정보실 정보를 임베드로 출력합니다.`);
            await interaction.reply({embeds: [helpEmbed], allowedMentions: {repliedUser: false}});
        } else if(helpCommand === "로아와") {
            const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`/로아와 <닉네임> 사용방법`)
            .setDescription(`<닉네임>에 해당하는 캐릭터의 로아와 정보를 브라우저로 엽니다.`);
            await interaction.reply({embeds: [helpEmbed], allowedMentions: {repliedUser: false}});
        } else if(helpCommand === "나침반"){
            const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`/나침반 사용방법`)
            .setDescription(`현재 로아와 크롤링 서비스 종료로 인한 사용불가입니다. 새로운 서비스로 변경하겠습니다.`);
            await interaction.reply({embeds: [helpEmbed], allowedMentions: {repliedUser: false}});
        } else if(helpCommand === "용어"){
            const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`/용어 사용방법`)
            .setDescription(`<단어>에 해당하는 로스트아크 용어 설명을 제공합니다.`);
            await interaction.reply({embeds: [helpEmbed], allowedMentions: {repliedUser: false}});
        } else {
            await interaction.reply("해당 명령어는 없습니다.");
        }
	},
};