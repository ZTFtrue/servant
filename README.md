# servant
simple create nodejs serve for web-develpoer

# how to use

```sh
# write service.conf

# create serve 
node create-serve.js

# run
node app.js

# then request: http://localhost:3000/your_url
```



# what is service.conf

It is just a text file, which is created by http request method and url, error message (return if error occurs), request header, response header, and response content.
some item start with text return text, each item must be divided using blank lines.

它只是一个文本文件，由 http请求方法和url、错误消息（如果发生错误则返回）、请求标头、响应标头、响应内容构成。
如果有条目以文本开头，则返回文本，每个项目都必须用空白行分隔。


example:

```conf

METHOD:GET
URL:/users

# error message, i only replace errormessage
{"error","errormessage not equal"}

# request header, only equal,not required
text token:hello

# request content
text {"name":"test","password":"123"}

#text reponse header, not required
text token:world

# reponse content
# {}
text {"name":"hello world"}
# sql mysql:select name from table
```

