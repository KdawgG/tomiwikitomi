const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const nunjucks = require ('nunjucks')
const Page = require('./models').Page
const User = require('./models').User
const wikiRouter = require('./routes/wiki')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

var env = nunjucks.configure('views', {noCache: true})
app.set('view engine', 'html')
app.engine('html', nunjucks.render)
app.use(express.static('public'))

app.use('/wiki',wikiRouter);
app.get('/', function(req,res,next){
	res.send("Hello, you have reached the root")
})

User.sync()
.then(function(){
	return Page.sync()
})
.then(function(){
	app.listen(3000, function() {
		console.log('Server is listening on port 3000!')
	})
})
.catch(console.error)

//listen