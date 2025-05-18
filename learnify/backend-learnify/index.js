const app = require('./app');
const config = require('./config');
console.log(app)

app.listen(config.PORT, ()=>{
  console.log(`server is listening on ${config.PORT}`);
})
