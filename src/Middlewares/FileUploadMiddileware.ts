import * as formidable from 'formidable';
class UploadFiles {
  static async upload(req, res, next) {
    try {
      const form = formidable({ multiples: true });
      form.parse(req, async (err, fields, files) => {
        if (err) {
          next(err);
        }
        else {
          req.files = files;
          req.fields = fields;
          console.log('Request-fields', req.fields);
          next();
        }
      });

    } catch (e) {
      next(e)
    }

  } 

}

export default UploadFiles;