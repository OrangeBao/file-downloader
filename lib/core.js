import {
    initDownloader
} from './document'


function getFileName (disposition) {
    if (!disposition) return null
    var nameStr = disposition.split('filename')
    if (!nameStr || !nameStr[1]) {
        return null
    }
    nameStr = nameStr[1].split("=")
    if(!nameStr || !nameStr[1]) {
        return null
    }
    return nameStr[1].trim()
}

var xhr = null;

export function downLoaderByUrl (url, options = {}) {
    const { openProgress, setProgress, closeProgress, setFileName, changeToError } = initDownloader()
    xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    if (options && options.beforeSend) {
        options.beforeSend(xhr);
    }
    var filename = options.fileName
    xhr.responseType = 'blob'
    xhr.onload = function() {
        if (this.status == 200) {
            var blob = this.response;
            var a = document.createElement('a')
            var url = URL.createObjectURL(blob)
            a.href = url
            a.download = filename
            a.click()
            window.URL.revokeObjectURL(url)
        } else {
            changeToError(options.errorHandle && options.errorHandle(this) || '下载失败')
            // closeProgress()
        }
    }
    xhr.addEventListener("progress", function (evt) {
        filename = options.fileName || getFileName(xhr.getResponseHeader('Content-Disposition')) || ''
        setFileName(filename)
        if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total
            setProgress(percentComplete * 100)
            if (percentComplete === 1) {
                setTimeout(function() {
                    if (evt.currentTarget.status === 200) {
                        closeProgress()
                    }
                }, 800)
            }
        }
    }, false)

    // 请求出错
    xhr.addEventListener('error', e => {
        changeToError(options.errorHandle && options.errorHandle(e) || '下载失败')
    });

    xhr.send()
    // 打开进度条
    openProgress()

}
