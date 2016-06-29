import {appName} from './config.es6';

class mongooseSchemaGenerator {
    constructor(name){
        this.appName = name + ' webapp';
        this.version = '0.0.1';
    }
    start(){
        console.info(["Start:", this.appName, this.version].join(" "));
    }
}

let MSG = new mongooseSchemaGenerator(appName);

window['$MSG'] = MSG;
MSG.start();