var content = require('app/dbschema/content');
var ContentModel = content.getContentMongooseModel();
exports.addContent = function(link, cb) {
  errStr = undefined;
  content = {};
  content.contentLink = undefined;
  if (undefined == link) {
      errStr = "Undefined link";
      cb({error: errStr});
      return;
  }
  ContentModel.find({'link' : link}, function dupeCube(err, results) {
      if (err) {
          cb({error: err});
          return;
      } else {
          content.contentLink = link;
          var newContent = new ContentModel(
              {
                active: true,
                link: content.contentLink
              });
          newContent.save(function (err, content) {
              if (err) {
                  cb({error: err});
              } else {
                  cb(content);
              }
          });
       }
    });
}

exports.getContent = function(contentId, cb) {
  ContentModel.find({'_id' :{$in: contentId}}, function contentId(err, results) {
      if (err) {
          cb({error: "Error from contentId check"});
      }
      if (results.length < 0) {
        cb({error: 'No content with that id exists.'});
      } else {
        cb(results);
      }
  });

}
