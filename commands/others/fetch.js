const {
    get
} = require('snekfetch');
const parser = require('xml2js')
const fs = require('fs');
const path = require('path');




exports.run = (client, message, args) => {

    var t = 1;
    function timedLoop() {
        var outerTime = Math.floor(Math.random() * (500 - 400) + 400);
        setTimeout(function () {
            try {
                get('http://27.101.201.20/opnAPI/publicReportList.do?nPageIndex=' + t + '&nCountPerPage=50').then(res => {
                    var xmlText = res.text;
                    var json = ''
                    parser.parseString(xmlText, function (err, result) {
                        if (err) throw err;
                        json = result;
                    });
                    var items = json.ROOT.ITEMS[0].ITEM;
                    for (let i = 0; i < items.length; i++) {
                        var tempArr = []
                        var gcode = items[i].MNG_NO.toString();
                        var kName = items[i].NAME_KO.toString();
                        var cName = items[i].NAME_CH.toString();
                        var nameDiff = (items[i].DIFF_NAME.toString().length > 0 ? items[i].DIFF_NAME.toString() : '없음');
                        var birthDay = items[i].BIRTHDAY.toString();
                        var lastDay = items[i].LASTDAY.toString();
                        var sex = items[i].SEX.toString();
                        var register = items[i].REGISTER_LARGE_DIV.toString() + " " + items[i].REGISTER_MID_DIV.toString() + " " + (items[i].REGISTER_SMALL_DIV.toString() ? items[i].REGISTER_SMALL_DIV.toString() : '');
                        var addRess = items[i].ADDRESS.toString();
                        var judgeYear = items[i].JUDGE_YEAR.toString();
                        var hunKuk = items[i].HUNKUK.toString();
                        var workoutAffil = items[i].WORKOUT_AFFIL.toString();
                        var achiveMent = items[i].ACHIVEMENT.toString();
                        tempArr.push(gcode, kName, cName, nameDiff, birthDay, lastDay, sex, register, addRess, judgeYear, hunKuk, workoutAffil, achiveMent);
                        fs.appendFileSync(path.resolve(__dirname, 'others', 'result2.json'), JSON.stringify(tempArr, null, 2));
                        fs.appendFileSync(path.resolve(__dirname, 'others', 'result2.json'), ',', 'utf-8');
                    }
                }).catch(err => {
                    console.log(err);
                });
            } catch (err) {
                return message.channel.send(err.stack);
            }
            t++
            var innerTime = Math.floor(Math.random() * (10000 - 8500) + 8500);
            if (t < 305) {
                if (t % 50 == 0) {
                    setTimeout(() => {
                        console.log(t, "waiting for :" + innerTime / 1000 + "seconds");
                        timedLoop();
                    }, innerTime);
                } else {
                    console.log(t, "waiting for :" + outerTime / 1000 + "seconds");
                    timedLoop();
                }
            }
        }, outerTime);
    }
    timedLoop();

};