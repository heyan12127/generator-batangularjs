var Generator = require('yeoman-generator');

module.exports = class extends Generator{

  constructor(args, opts) {
    super(args, opts);

    if(!this._isArgsValids(args)){
      this.log.error('Sintax error, you must use this sintax: batangularjs:controller [module] [controller]');
      return;
    };

    this.moduleName = args[0];
    this.controllerName = args[1];

    this._writeProject();

  }

  method(){};

  _isArgsValids(args) {
    return args.length >= 2;
  }

  _capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  _writeProject() {
    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath(`app/${this.moduleName}/${this.controllerName}.controller.js`),
      {
        controllerName: this._capitalize(this.controllerName),
        moduleName: this.moduleName
      }
    );
  }

}