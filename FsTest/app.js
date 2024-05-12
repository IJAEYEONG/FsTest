var http = require('http');
var fs = require('fs');
var url = require('url'); // URL 모듈

var app = http.createServer(function(request,response){
    var _url = request.url; //URL 요청
    var queryData = url.parse(_url, true).query; //URL을 분석하는 모듈 중, querystring 값
    var pathname = url.parse(_url, true).pathname; // URL을 분석하는 모듈 중, pathname 값

    //요청한 pathname이 루트값이라면 , if문이 실행
    if(pathname === '/'){
      if(queryData.id === undefined){
          fs.readdir('./data', function(err, filelist){
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            
            var list = '<ul>';
            var i = 0;
            while(i < filelist.length){
              list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
              i+=1;
            }
            list = list +'</ul>';
            
            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200); // 페이지가 정상적으로 출력되면 200, 오류페이지면 404.
            response.end(template); //화면출력하는부분
          });


      } else {
        fs.readdir('./data', function(err, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = '<ul>';
          var i = 0;
          while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i+=1;
          }
          list = list +'</ul>';
        //파일을 읽는 함수. description변수가 파일.
          fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
            var title = queryData.id
            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200); // 페이지가 정상적으로 출력되면 200, 오류페이지면 404.
            response.end(template); //화면출력하는부분
          });
        });
      }
    //페이지의 pathname이 루트값이 아니라면, else문이 실행
    } else {
      response.writeHead(404); // 페이지가 정상적으로 출력되면 200, 오류페이지면 404.
      response.end('NOT FOUND'); //화면출력하는부분
    }

});
app.listen(3000);