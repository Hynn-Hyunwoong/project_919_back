const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config')["db"][env];


const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.reddirSync(__dirname).filter((file) => file.indexOf("model") !== -1).map(file => {
    try{ 
        require(path.join(__dirname, file))(sequelize,Sequelize);
    }
    catch(e){
        console.log(`문제가 발생했습니다. Error : ${file}. Error Detail : ${e}`)
    }});

const {models} = sequelize ;
for (const k in models){
    if(typeof models[k].associate !== "function") continue;
    models[k].associate(models);
}

module.exports = { sequelize, Sequelize}