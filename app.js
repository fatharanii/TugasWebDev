var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app = express();

//DB connect string
var connect = 'postgres://postgres:fatharani@localhost:dbfatha';

const { Client } = require('pg');
const connectionString = 'postgres://postgres:fatharani@localhost:5432/dbfatha';
const client = new Client({
    connectionString: connectionString
});
client.connect()
    .then(res => console.log("Connected Successfully"))
    .catch(err => console.log("Connection Failed"));

//Assign Dust Engine to .dust Files
app.engine('dust', cons.dust);

//Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.get('/', function(req, res){
    
        client.query('SELECT * FROM berita', function(err, result){
            if (err){
                return console.error('error running query', err);
            }
            res.render('index', {berita : result.rows});
        });
    });

var id;
client.query("SELECT * FROM berita", function(err, result) {
    id = result.rows.length + 1;
});

app.post('/add', function(req, res){
    client.query("INSERT INTO berita(id, judul_berita, konten, kategori) VALUES($1, $2, $3, $4)", 
    [id, req.body.judul_berita, req.body.konten, req.body.kategori]);
    id = id + 1;
    res.redirect('/');
});

app.delete('/delete/:id', function(req, res){
    client.query("DELETE FROM berita WHERE id = $1", 
    [req.params.id]);
    res.send(200);
});

app.post('/edit', function(req, res){
    client.query("UPDATE berita SET judul_berita=$1, konten=$2, kategori=$3 WHERE id=$4", 
    [req.body.judul_berita, req.body.konten, req.body.kategori, req.body.id]);
    res.redirect('/');
});
    
//server
app.listen(3000, function(){
    console.log('Server Started on Port 3000');
});