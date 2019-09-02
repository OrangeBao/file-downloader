import {
    tipsWrapper,
    bcDownloaderTitle,
    bcDownloaderClose,
    bcDownloader,
    bcDownloaderOuter,
    bcDownloaderInner,
    bcDownloaderBg,
    bcDownloaderText,
    bcDownloaderTextInner
} from './css'


//  创建节点
export function createElement(tag, styles, childrens, innerText) {
    var ele = document.createElement(tag)
    if (styles) {
        Object.keys(styles).forEach(function(key) {
            ele.style[key] = styles[key]
        });
    }
    if (childrens) {
        childrens.forEach(function(item) {
            ele.appendChild(item)
        })
    }
    if (innerText) {
        ele.innerHTML = innerText
    }
    return ele
}

var rEle = null;
var bgEle = null;
var textInnerEle = null;
var closeBtn = null;

// 初始化插件
export function initDownloader() {
    rEle = createElement('div', tipsWrapper, [
        createElement('div', bcDownloaderTitle, [
            createElement('span', null, null, '下载进度:'),
            closeBtn = createElement('span', bcDownloaderClose, null, '隐藏')
        ]),
        createElement('div', bcDownloader, [
            createElement('div', bcDownloaderOuter,[
                createElement('div', bcDownloaderInner, [
                    bgEle = createElement('div', bcDownloaderBg)
                ])
            ]),
            createElement('span', bcDownloaderText, [
                textInnerEle = createElement('span', bcDownloaderTextInner)
            ])
        ])
    ])
    closeBtn.addEventListener('click', function() {
        closeProgress()
    })
    document.body.appendChild(rEle)
}

export function openProgress() {
     // 初始化进度条
     setProgress(0)
     rEle.style.display = "inline-block"
}

export function closeProgress() {
    rEle.style.display = "none"
}

export function setProgress (per) {
    var tagV = per
    if (per < 0) {
        tagV = 0
    }
    if (per > 100) {
        tagV = 100
    }
    var perWidth = Math.floor(tagV) + '%'
    bgEle.style.width = perWidth
    textInnerEle.innerHTML = perWidth
}
