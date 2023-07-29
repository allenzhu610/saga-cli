#! /usr/bin/env node
var program = require('commander');
var fs=require('fs');
var path=require('path');
var stat=fs.stat;
var info=require("./package.json");

var copy=function(src,dst){
    fs.readdir(src,function(err,paths){
        if(err){
            throw err;
        }
        paths.forEach(function(path){
            var _src=src+'/'+path;
            var _dst=dst+'/'+path;
            var readable;
            var writable;
            stat(_src,function(err,st){
                if(err){
                    throw err;
                }
                
                if(st.isFile()){
                    readable=fs.createReadStream(_src);//创建读取流
                    writable=fs.createWriteStream(_dst);//创建写入流
                    readable.pipe(writable);
                }else if(st.isDirectory()){
                    exists(_src,_dst,copy);
                }
            });
        });
    });
}
var exists=function(src,dst,callback){
    //测试某个路径下文件是否存在
    fs.exists(dst,function(exists){
        if(exists){//存在
            callback(src,dst);
        }else{//不存在

            fs.mkdir(dst,function(){//创建目录
                callback(src,dst)
            })
        }
    })
}

function help(){
	console.log();
  	console.log("  查看相应Command [option]:")
  	console.log();
  	console.log("    $ %s [command] --help",info.name)
  	console.log();
	console.log('  Example:');
    console.log();
    console.log("  随便进入到一个目录:");
    console.log('    $ %s init SagaTest',info.name);
    console.log('  执行完成后:');
    console.log('    $ cd SagaTest');
    console.log('    $ npm install');
    console.log('  启动项目:');
    console.log('    $ npm run dev      //开发环境');
    console.log('  或者:');
    console.log('    $ npm run build    //用于生产环境代码打包');
    console.log();
}

function done(name){
	console.log();
	console.log('  项目已初始化完成! \r');
	console.log('  请执行后续操作: \r');
	console.log('    $ cd %s \r',name);
	console.log('    $ npm install \r');
	console.log();

}
 
program
  .version(info.version)
  .usage('<command> [options]')
  .on('--help',function(){
  		help();
  });

program
	.command('init <name>')
	.description('初始化React Saga项目')
	.option("-f,--force",'覆盖安装')
	.action(function(name,command){
		fs.exists(name,function(flag){
	        if(flag){//存在
	           if(command.force){	
	           		exists(path.join(__dirname, 'templates/webpack'),name,copy);
	           		done(name);
	           }else{
	           		console.log("\r");
	           		console.log("  文件已经存在、如果想覆盖安装,请执行:");
	           		console.log("\r");
	           		console.log("    $ %s init -f <name>",info.name);
	           }
	        }else{//不存在
	        	fs.mkdir(name,function(error){
					if(error){
						console.error(error);
					}else{
						exists(path.join(__dirname, 'templates/webpack'),name,copy);
						done(name);
					}
				});
	        }
	    })
}).on("--help",function(){
	help();
});


program
    .command('demo <name>')
    .description('创建一个Demo')
    .action(function(name,command){
        fs.exists(name,function(flag){
            if(flag){//存在
                exists(path.join(__dirname, 'templates/demo'),name,copy);
                done(name);
            }else{//不存在
                fs.mkdir(name,function(error){
                    if(error){
                        console.error(error);
                    }else{
                         exists(path.join(__dirname, 'templates/demo'),name,copy);
                        done(name);
                    }
                });
            }
        })
}).on("--help",function(){
    help();
});

program.parse(process.argv);
