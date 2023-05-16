const express=require('express');
const app=express();
var port=8080;

app.get('/',(request,response) => {
    response.sendFile(__dirname+'/index.html');
});

app.listen(port ,() => {
    console.log(`http://localhost:${port}/`);
});