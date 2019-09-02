import {
    openProgress,
    closeProgress,
    setProgress
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

export function downLoaderByUrl (url, options) {

    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    /**
     * setRequestHeader
     *  */ 
    if (options && options.beforeSend) {
        options.beforeSend(xhr);
    }
    xhr.responseType = 'blob'
    xhr.onload = function() {
        if (this.status == 200) {
            var blob = this.response;
            var filename = getFileName(xhr.getResponseHeader('Content-Disposition')) || '未命名'
            var a = document.createElement('a')
            var url = URL.createObjectURL(blob)
            a.href = url
            a.download = filename
            a.click()
            window.URL.revokeObjectURL(url)
        } else {
            console.error('error')
            closeProgress()
        }
    }
    xhr.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total
            setProgress(percentComplete * 100)
            if (percentComplete === 1) {
                setTimeout(function() {
                    // closeProgress()
                }, 800)
            }
        } else {
            // 异常处理
        }
    }, false)
    xhr.send()
    // 打开进度条
    openProgress()

}
