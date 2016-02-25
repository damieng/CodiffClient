import { remote } from 'electron';
import path from 'path';
import fs from 'fs';

export default class Configuration {
  constructor() {
    const configDir = path.join(remote.app.getPath('appData'), 'Codiff');
    if(!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir);
    }

    this.configPath = path.join(configDir, 'config.json');
    if(!fs.existsSync(this.configPath)) {
      fs.writeFileSync(this.configPath, JSON.stringify({}, null, 2));
    }

    this.values = require(this.configPath);
    console.log(this.values);
  }

  get(key) {
    return this.values[key];
  }

  set(key, value) {
    console.log(key, value);
    this.values[key] = value;
    this.commit();
  }

  commit() {
    fs.writeFileSync(this.configPath, JSON.stringify(this.values, null, 2));
  }
}
