const { exec, execSync } = require('child_process');
const fs = require('fs'),
  md5 = require('md5');
let preveMd5 = null,
  fsWait = false

var arguments = process.argv.splice(2);


const filePath = `./${arguments[0] || 'src'}/`  
console.log(`正在监听 ${filePath}`);
fs.watch(filePath,(event,filename)=>{
  if (filename){
    if (fsWait) return;
    fsWait = setTimeout(() => {
      fsWait = false;
    }, 100)
    try {
      var currentMd5 = md5(fs.readFileSync(filePath + filename))
    } catch (err) {
      console.log(err);
    }

    if (currentMd5 == preveMd5){
      return 
    }
    preveMd5 = currentMd5
    let date = new Date();
    console.log(date.toLocaleString());
    console.log('正在编译...')
    console.log('我正在编译，别急...')
    console.log('千万不要急...')
    execSync(`npm run dev -- ${arguments[0] || 'src'}`)
    console.log('编译完成')

  }
})