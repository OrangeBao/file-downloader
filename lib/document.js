import {
    tipsWrapper,
    bcDownloaderTitleWrapper,
    bcDownloaderTitle,
    bcDownloaderClose,
    bcDownloader,
    bcDownloaderOuter,
    bcDownloaderInner,
    bcDownloaderBg,
    bcDownloaderText,
    bcDownloaderTextInner,
    bcDownloaderError,
    bcDownloaderStatusList,
    bcDownloaderErrorClose
} from './css'

const TITLE_TEXT = '下载进度:'
const HIDE_TEXT = '隐藏'
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

var statusList = null;


// 初始化插件
export function initDownloader() {
    var rEle = null;
    var bgEle = null;
    var textInnerEle = null;
    var closeBtn = null;

    var titleEle = null;

    var fileName = '';


    rEle = createElement('div', tipsWrapper, [
        createElement('div', bcDownloaderTitleWrapper, [
            titleEle = createElement('span', bcDownloaderTitle, null, TITLE_TEXT),
            closeBtn = createElement('span', bcDownloaderClose, null, HIDE_TEXT)
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

    if (!statusList) {
        statusList = createElement('div', bcDownloaderStatusList)
        document.body.appendChild(statusList)
    }

    statusList.appendChild(rEle)

    function setProgress(per) {
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

    function openProgress () {
        // 初始化进度条
        setProgress(0)
        rEle.style.display = "inline-block"
    }

    function closeProgress () {
         rEle.style.display = "none"
    }

    function setFileName(fn) {
        fileName = fn
        titleEle.innerHTML = fileName + TITLE_TEXT
    }
    
    function changeToError(errMsg) {
        while(!!rEle.childNodes.length) {
            rEle.removeChild(rEle.childNodes[0])
        }

        [
            createElement('div', bcDownloaderTitleWrapper, [
                createElement('span', bcDownloaderError, null, (fileName || '') + errMsg),
                closeBtn = createElement('span', bcDownloaderErrorClose, null, '+')
            ])
        ].forEach(item => {
            rEle.appendChild(item)
        })

        closeBtn.addEventListener('click', function() {
            closeProgress()
        })
    }

    return {
        setProgress,
        openProgress,
        closeProgress,
        setFileName,
        changeToError
    }
}
