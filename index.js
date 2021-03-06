var Slack = require("slack-node");
var request = require("request");
var fs = require("fs");

apiToken = "<apitoken>"; // ここにAPIトークンを貼り付ける。
slack = new Slack(apiToken);

slack.api("emoji.list", function(err, response) {
  for (key in response.emoji) {
    url = response.emoji[key];
    //エイリアスは無視
    if (url.match(/alias/)) {
      continue;
    }

    // 取得対象の拡張子
    extention = url.match(/\.[^\.]+$/);

    request
      .get(url)
      .on("response", function(res) {})
      .pipe(fs.createWriteStream("image/" + key + extention));
  }
});
