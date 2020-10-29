var hostname = 'localhost';
var app = require('express')();
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '15.164.232.202',
  user     : 'root',
  password : '0128gksqls',
  port     : '3306',
  database : 'shem'
});
connection.connect();

http.createServer(function(request, response){
  if(request.url == '/favicon.ico') {
      return response.writeHead(404);
  }
  
}).listen(3000,hostname, function(){
  console.log('listening...');
});



//��¥
function getTimeStamp() {
  var d = new Date();
  var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);
  return s;
}
function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}

app.use(bodyParser.json());

app.get('/',function(req,res){
  var url = './templates/home.html';
  res.send( fs.readFile(url));
  fs.readFile(url,function(err,data){
    if(err) console.log('error', err);
    else res.send(data);
  });
});

//DB���
  connection.query('SELECT * from ex_data', function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ');
    else
      console.log('Error while performing Query.', err);
  });

app.get('/welcome',function(req,res){

});

app.post('/',function(req,res){
  var body=req.body;
  var sql = 'INSERT INTO energy_hour(dt,house_id, elec_id, energy_hour) VALUES (?,?,?,?)';
  console.log(getTimeStamp(), body.house_id, body.elec_id, body.energy_hour);
  var params = [getTimeStamp(), body.house_id, body.elec_id, body.energy_hour];  // ���߿� ���� �Ķ���ͷ� �ֱ� @@ body.key
  //var params = [getTimeStamp(), 'kim', 'sanghyun', 56.7];
  connection.query(sql, params, function(err, rows, fields){// ������ �ι�° ���ڷ� �Ķ���ͷ� ������(������ ġȯ���Ѽ� ������. ���Ȱ��� ������ ���谡 ����(sql injection attack))
    if(err) console.log(err);
  });
});