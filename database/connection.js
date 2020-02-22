let oracledb = require('oracledb');
let _ = require('lodash');
let DB = module.exports = {};

DB.getConnection = function () {
  return oracledb.getConnection(
    {
      user: process.env.ORACLE_USERNAME,
      //setx ORACLE_PASSWORD <password>
      //setx ORACLE_PASSWORD <password>
      password: process.env.ORACLE_PASSWORD,
      connectString : ""
      // connectString: ""
    });
}

let executequery = function (query) {

  return this.getConnection().then(function (connection) {
    return connection.execute(query).then(function (result) {
      console.log('Values after query excuted.', result);
      var rowObjects = _.map(result.rows, function (row, index) {
        return _.zipObject(_.map(result.metaData, 'name'), row);

      });

      // console.log(rowObjects);
      connection.close();
      return rowObjects;
    }).catch(function (err) {
      console.log(err.message);
      connection.close();
      throw err;
    })
  }).catch(function (err) {
    console.log(err.message);
    throw err;
  });
}
DB.executequery = executequery;

let getProgramDetailsByCode = function () {
  let query = `select * from TABLENAME`;
  return this.executequery(query);
}

DB.getProgramDetailsByCode = getProgramDetailsByCode;

let getEaxmineeZoneDetails = function (mcatId) {

  let query = `select * from TABLENAME where MCAT_ID='${mcatId}'`;
  return this.executequery(query);
}

DB.getEaxmineeZoneDetails = getEaxmineeZoneDetails;

