let fs = require("fs");

function run(path, name) {
    var data = fs.readFileSync(path + name).toString();
    let string = fs.readFileSync('./default-app.js');
    let itemNumbers = 6;
    // PORT:3000
    string = string + 'app.set(\'port\', 3000);';
    let currentMethod = 'GET';
    let details = data.split('\n\n');
    let errorMessage;
    for (let j = 0; j < details.length; j++) {
        let currentInterface = j % itemNumbers;
        let item = details[j].split('\n');
        for (let i = 0; i < item.length; i++) {
            if (item[i].indexOf('#') === 0) {
                continue;
            }
            switch (currentInterface) {
                case 0:
                    let requestMessage = item[i].split(':');
                    if (requestMessage[0].toUpperCase() === 'METHOD') {
                        if (requestMessage[1].toUpperCase() === 'GET') {
                            currentMethod = 'GET';
                            string = string + 'app.get(\'';
                        } else if (requestMessage[1].toUpperCase() === 'POST') {
                            string = string + 'app.post(\'';
                            currentMethod = 'POST';
                        }
                    } else if (requestMessage[0].toUpperCase() === 'URL') {
                        string = string + requestMessage[1] + '\',function (req, res, next) {';
                    }
                    break;
                case 1:
                    errorMessage = item[i];
                    break;
                case 2:
                    let requestHeader = item[i].split(' ');
                    if (requestHeader[0].toUpperCase() === 'TEXT') {
                        let reqHeaders = requestHeader.splice(1, requestHeader.length).join(' ').split(':');
                        string = string + 'if(req.get(\'' + reqHeaders[0] + '\')|req.get(\'' + reqHeaders[0] + '\')!==\'' + reqHeaders[1] + '\'){ res.send(\'' + errorMessage.replace('errormessage', reqHeaders[0]) + '\'); return; }';
                    }
                    break;
                case 3: // 请求内容验证
                    if (currentMethod === "GET") {

                    } else if (currentMethod === "POST") {

                    }
                    // let requestContent = item[i].split(' ');
                    // if (requestContent[0].toUpperCase() === 'TEXT') {
                    //     let reqHeaders = requestContent.splice('0').join(' ');
                    //     string = string + 'req.headers.' + reqHeaders[0] + '===' + reqHeaders[1];
                    // }
                    break;
                case 4: // 回复头部
                    let reposeHeader = item[i].split(' ');
                    if (reposeHeader[0].toUpperCase() === 'TEXT') {
                        let resHeaders = reposeHeader.splice(1, reposeHeader.length).join(' ').split(':');
                        string = string + 'res.header("' + resHeaders[0] + '","' + resHeaders[1] + '");';
                    }
                    break;
                case 5:
                    let reposeContent = item[i].split(' ');
                    if (reposeContent[0].toUpperCase() === 'TEXT') {
                        let resContent = reposeContent.splice(1, reposeContent.length).join(' ');
                        string = string + 'res.send(\'' + resContent + '\')});';
                    }
                    break;
            }
        }
    }
    fs.writeFileSync(path + 'app.js', string, {
        flag: "w"
    });
}
// 如果不输入文件名,则遍历输入目录的所有文件(待开发)
run("./", 'service.conf');