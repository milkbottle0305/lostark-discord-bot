const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const puppeteer = require('puppeteer');
const axios = require("axios");
const cheerio = require("cheerio");

module.exports ={
    data: new SlashCommandBuilder()
        .setName('각인')
        .setDescription('클래스별 로아와 상위 10명의 각인 분석 정보를 제공합니다.')
        .addStringOption((option) =>
            option.setName('클래스')
                .setDescription('각인 정보를 알고싶은 직업')
                .setRequired(true)),
    async execute(interaction){
        await interaction.reply("현재 서비스를 중지한 상태입니다.");
        // const class_name = interaction.options.getString('클래스'); 

        // let job_number = 0;
        // let class_number = 0;

        // switch(class_name){
        //     case '디스트로이어' : job_number = 2; class_number = 2; break;
        //     case '버서커' : job_number = 2; class_number = 3; break;
        //     case '워로드' : job_number = 2; class_number = 4; break;
        //     case '홀리나이트' : job_number = 2; class_number = 5; break;
        //     case '기공사' : job_number = 3; class_number = 2; break;
        //     case '배틀마스터' : job_number = 3; class_number = 3; break;
        //     case '스트라이커' : job_number = 3; class_number = 4; break;
        //     case '인파이터' : job_number = 3; class_number = 5; break;
        //     case '창술사' : job_number = 3; class_number = 6; break;
        //     case '건슬링어' : job_number = 4; class_number = 2; break;
        //     case '데빌헌터' : job_number = 4; class_number = 3; break;
        //     case '블래스터' : job_number = 4; class_number = 4; break;
        //     case '스카우터' : job_number = 4; class_number = 5; break;
        //     case '호크아이' : job_number = 4; class_number = 6; break;
        //     case '바드' : job_number = 5; class_number = 2; break;
        //     case '서머너' : job_number = 5; class_number = 3; break;
        //     case '소서리스' : job_number = 5; class_number = 4; break;
        //     case '아르카나' : job_number = 5; class_number = 5; break;
        //     case '데모닉' : job_number = 6; class_number = 2; break;
        //     case '리퍼' : job_number = 6; class_number = 3; break;
        //     case '블레이드' : job_number = 6; class_number = 4; break;
        //     case '도화가' : job_number = 7; class_number = 2; break;
        //     default: interaction.reply('올바른 직업명을 입력해주세요!'); return;
        // }
        // const tempembed = new MessageEmbed()
        // .setColor('#F7819F')
        // .setDescription('작업중입니다!(1~2분 가량 소요될 수 있습니다)')

        // interaction.reply({ embeds: [tempembed], allowedMentions: {repliedUser: false} });

        // await puppeteer.launch().then(async browser => {
        //     const page = await browser.newPage();
        //     await page.goto('https://loawa.com/rank');

        //     await page.click(`#contents > article > form > div > div:nth-child(${job_number}) > div > div:nth-child(2) > div > label:nth-child(${class_number}) > span`);
        //     await page.waitForSelector('#contents > article > table > tbody > tr:nth-child(20) > td:nth-child(11) > a > svg > path');
        //     await page.waitForTimeout(1000);

        //     let rank_number = 20;
        //     let all_name = [];

        //     for(var i = 1; i < rank_number + 1; i++){
        //         let name = await page.$eval(`#contents > article > table > tbody > tr:nth-child(${i}) > td:nth-child(2) > a`, element => {
        //             return element.textContent;
        //         })
        //         all_name.push(name);
        //     }
        //     page.close();
        //     browser.close();
            
        //     let all_url = [];

        //     for(i = 0; i< rank_number; i++){
        //         url = 'https://lostark.game.onstove.com/Profile/Character/' + all_name[i];
        //         all_url.push(url);
        //     }

        //     var each_stamp = new Object;
        //     var hole_stamp = new Object;

        //     await axios.all(all_url.map((each) => axios.get(encodeURI(each)))).then(axios.spread((...responses) => {
        //         for(i = 0; i < all_url.length; i++){
        //           let $ = cheerio.load(responses[i].data);
        //           $('ul.swiper-slide').children('li').each(function(){
        //               if($(this).find('span').text() in each_stamp){
        //                   each_stamp[$(this).find('span').text()] += 1;
        //               } else{
        //                   each_stamp[$(this).find('span').text()] = 1;
        //               }

        //               let one_stamp = $(this).find('span').text().split(' Lv');
        //               if(one_stamp[0] in hole_stamp){
        //                   hole_stamp[one_stamp[0]] += 1;
        //               } else{
        //                 hole_stamp[one_stamp[0]] = 1;
        //               }
        //           })
        //         }
        //     })).catch(error => {
        //         console.error(error);
        //     })

        //     var each_sortary = [];
        //     for(var name in each_stamp){
        //         each_sortary.push([name, each_stamp[name] * 5]);
        //     }
        //     each_sortary.sort(function(a, b){
        //         return b[1] - a[1];
        //     })

        //     let each_stamp_print = "";
        //     for(i = 0; i < each_sortary.length; i++){
        //         each_stamp_print += each_sortary[i][0] + ': ' + each_sortary[i][1] + '% \n';
        //     }

        //     var hole_sortary = [];
        //     for(var one in hole_stamp){
        //         hole_sortary.push([one, hole_stamp[one] * 5]);
        //     }
        //     hole_sortary.sort(function(a, b){
        //         return b[1] - a[1];
        //     })

        //     let hole_stamp_print = "";
        //     for(i = 0; i< hole_sortary.length; i++){
        //         hole_stamp_print += hole_sortary[i][0] + ': ' + hole_sortary[i][1] + '% \n';
        //     }

        //     const stampembed = new MessageEmbed()
        //     .setColor('#F7819F')
        //     .setTitle(class_name)
        //     .setDescription(class_name + '의 상위 20명 각인 정보')
        //     .addFields(
        //         {name: "각인 전체 정보", value: hole_stamp_print, inline: true},
        //         {name: "각인 상세 정보", value: each_stamp_print, inline: true}    
        //     )

        //     interaction.editReply({ embeds: [stampembed], allowedMentions: {repliedUser: false} });
        // })
    }
}