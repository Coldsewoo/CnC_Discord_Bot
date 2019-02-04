const {
    get
} = require('snekfetch');
const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path')
var idArr = ['가져올 URL들의 넘버']



exports.run = (client, message, args) => {
    var finalArr = [];
    var t = 0;
    var max = idArr.length;
    function timedLoop() {
        setTimeout(function () {
            var uId = idArr[t];
            console.log(t)
            try {
                var webPath = 'http://e-gonghun.mpva.go.kr/user/ContribuReportDetail.do?goTocode=20002&pageTitle=Merit&mngNo=' + idArr[t];

                get(webPath).then(res => {
                    var context = res.body.toString();
                    var $ = cheerio.load(context)
                    var names = $('td', ('.table-wrap'));
                    var namesArr = [];
                    var texts = names.text().split(/\n/);
                    for (let i = 0; i < texts.length; i++) {
                        texts[i] = texts[i].toString().replace(/\t/g, '');
                        if (texts[i].length > 0 & !namesArr.includes(texts[i])) {
                            namesArr.push(texts[i]);
                        }
                    }


                    // script 태그로 base64인코딩 되어있는 항목들(이름, 생년 ,사망년, 본적, 주소)
                    var searchIndexText = "<script type=\"text/javascript\">utf8_decode"
                    var searchIndexInit = 1;
                    var searchIndex = 0;
                    var arr = [];
                    while (searchIndex < context.length) {
                        searchIndex = context.indexOf(searchIndexText, searchIndexInit)
                        if (searchIndex == -1) break;
                        var searchIndexEnd = context.indexOf(")", searchIndex)
                        var text = context.slice(searchIndex, searchIndexEnd)
                        var tempArr = text.split('\'');
                        if (tempArr[3] == '#namekoDiv2') break;
                        tempArr[1] = Buffer.from(tempArr[1], 'base64').toString()
                        arr.push(tempArr[1], tempArr[3]);
                        searchIndexInit = searchIndexEnd;

                    }
                    for (let i = 0; i < arr.length; i += 2) {
                        namesArr.push(arr[i]);
                    }
                    namesArr.push(webPath);
                    //  [ '0가재연','1#namekoDiv','21923-04-08','3#birthdayenm','41945-03-29','5#deathdatenm','6충청남도','7#famp1','8서산','9#famp2','10瑞山 東門','11#famp3','12京畿 仁川','#address' ] -> 6 8 10이 본적, 12가 주소
                    return namesArr;
                }).then((namesArr) => {
                    fs.appendFileSync(path.resolve(__dirname, 'others', 'result.json'), JSON.stringify(namesArr, null, 2));
                    fs.appendFileSync(path.resolve(__dirname, 'others', 'result.json'), ',', 'utf-8');
                }).catch(err => {
                    // catch callback을 여기서??
                })
            } catch (err) {
                // 여기서는 왜 못잡는걸까요??
                fs.appendFileSync(path.resolve(__dirname, 'others', 'result.json'), "\"" + uId + "\"" + ",", 'utf-8');
                console.log(err.message, uId);
            }
            t++;
            if (t < idArr.length) {
                timedLoop();
            }
        }, 100);
    }
    timedLoop();
};