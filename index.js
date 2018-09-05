var fs = require('fs');
var _ = require('lodash');
var path = require('path');

var dirname = './dir';

var files = fs.readdirSync(dirname);

processFiles(files).then((allContent) => {
  console.log('allContent', allContent.length);
  fs.writeFileSync('allContent.json', JSON.stringify(allContent, null, 4));
});

function extractContent(content) {
  console.log("extrating content");
  var docs = _.get(content, 'somepathhere', []);
  return docs.map(function (doc) {
    return doc.messageid;
  });
}


async function processFiles(files) {
  var allContent = [];
  for (const fileName of files) {
    console.log("Processing ", fileName);
    var fileContent = await fs.readFileSync(path.join(dirname, fileName), { encoding: 'utf8' });
    allContent = allContent.concat(extractContent(JSON.parse(fileContent)));
  }
  return allContent;
}