# 文件下载器file-downloader

在当前页面发起文件下载请求，可以设置下载请求的header信息。

## 安装
使用<script>标签引入
或者
`npm install file-downloader`

## 使用
```
    <html>
    <body>
        <head>
            <meta charset="utf-8">
            <title>Test</title>
        </head>
        <body>
            <a href="#" onclick="downLoaderByUrl('data.json')">下载</a>
        </body>
        <script src="file-downloader.js"></script>
    </html>
```



## 方法

| 名称         | 描述                                       | 参数                                    |
| ------------ | -------------------------------------------- | --------------------------------------- |
| downLoaderByUrl(string, object) | 触发下载 | url：下载链接； options：配置项                    |


## options说明

| 名称       | 说明                                   |
| :-------- | ------- |
| beforeSend | 发起下载请求之前，可以设置header  |
| errorHandle  | 错误情况的钩子，返回String用于提示   |




![iamge](https://github.com/OrangeBao/file-downloader/blob/master/demo.png) 