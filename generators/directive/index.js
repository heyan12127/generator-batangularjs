let Generator = require('yeoman-generator');

module.exports = class extends Generator{

  constructor(args, opts) {
    super(args, opts);

    if(!this._isArgsValids(args)){
      this.log.error('Sintax error, you must use this sintax: batangularjs:directive [module] [directive] <-ti>');
      return;
    };

    this.moduleName = args[0];
    this.directiveName = args[1];

    this.preFolder = opts.t?'directives':'';
    this.isolated = opts.i;

    this.folder = `app/${this.moduleName}/${this.preFolder}`;

    this._writeProject();
  }

  method(){}

  _capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  _isArgsValids(args){
    return args.length >= 2;
  }

  _writeProject(){
    if(this.isolated){
      this._multipleFile();
    }else{
      this._uniqueFile();
    }
  }

  _multipleFile(){
    this._copyDirectiveByTemplate('directive-separated.js');
    this._copyDirectiveByTemplate('directive-separated.html', 'template');
  }

  _uniqueFile(){
    this._copyDirectiveByTemplate('directive.js');
  }

  _copyDirectiveByTemplate(templateName, type = 'directive'){
    let extension = templateName.split('.').reverse()[0];
    this.fs.copyTpl(
      this.templatePath(templateName),
      this.destinationPath(`${this.folder}/${this.directiveName}.${type}.${extension}`),
      {
        moduleName: this.moduleName,
        directiveName: this.directiveName,
        capitalizeDirectiveName: this._capitalize(this.directiveName),
        folder: this.folder
      }
    );
  }

}