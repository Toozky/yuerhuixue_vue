function checkttf() {
    var base64 = document.getElementById("main").value;

    var base64Arr = base64.split(',');
    //alert(base64Arr.length);
    var imgtype = '';
    var base64String = '';
    if (base64Arr.length == 2 && base64Arr[0] == "data:application/x-font-ttf;base64") {
        //如果是图片base64，去掉头信息

        base64String = base64Arr[1];
        document.getElementById("main").value = "data:font/truetype;charset=utf-8;base64," + base64String;
    }

}

function update() {
    var base64 = document.getElementById("main").value;
    if (!base64)
        return;
    $.post("http://elef.top/api.php", {type: "base64", text: base64}, function (result) {
        console.log(result);

        $("#fileUrl").text(result.url);
        $("#fileUrl").attr("href", result.url);
    });

}

(function () {

    function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }

    function b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    var enc = document.getElementById("encode");
    var dec = document.getElementById("decode");
    var encGroup = enc.parentElement;
    var decGroup = dec.parentElement;

    dec.addEventListener('input', function () {
        try {
            decGroup.classList.remove('has-error');
            enc.value = b64DecodeUnicode(dec.value);
        } catch (e) {
            console.log('Unable to decode as UTF-8 string!');
            try {
                enc.value = atob(dec.value);
            } catch (ee) {
                console.log(ee);
                console.log('Invalid base64 string!');
                decGroup.classList.add('has-error');
            }
        }
    }, false);

    enc.addEventListener('input', function () {
        decGroup.classList.remove('has-error');
        dec.value = b64EncodeUnicode(enc.value);
    }, false);


    window.addEventListener("dragenter", function (event) {
        event.preventDefault();
    }, false);
    window.addEventListener("dragover", function (event) {
        event.preventDefault();
    }, false);
    window.addEventListener("drop", function (event) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //document.getElementById("main").insertAdjacentText
            document.getElementById("main").value = e.target.result;
            //document.getElementById("main").classList.remove('empty');
            checkttf();
        };
        reader.readAsDataURL(event.dataTransfer.files[0]);
        event.preventDefault();
    }, false);

    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function (e) {
        // Put the rest of the demo code here.

        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("main").value = e.target.result;
            //document.getElementById("main").classList.remove('empty');
            checkttf();
        }

        reader.readAsDataURL(file);
        event.preventDefault();
        fileInput.value = "";
    });

    document.getElementById("main").addEventListener('dblclick', function (e) {
        //alert("A");
        fileInput.click();
        e.preventDefault();
        // Some dazzling stuff happens be here

    });


})();

/** 将base64转换为文件对象
 *  @param {String} base64 base64字符串
 * */
var convertBase64ToBlob = function (base64) {
    var base64Arr = base64.split(',');
    var imgtype = '';
    var base64String = '';
    if (base64Arr.length > 1) {
        //如果是图片base64，去掉头信息
        base64String = base64Arr[1];
        imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':') + 1, base64Arr[0].indexOf(';'));
    }
    // 将base64解码
    var bytes = atob(base64String);
    //var bytes = base64;
    var bytesCode = new ArrayBuffer(bytes.length);
    // 转换为类型化数组
    var byteArray = new Uint8Array(bytesCode);

    // 将base64转换为ascii码
    for (var i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i);
    }

    // 生成Blob对象（文件对象）
    return new Blob([bytesCode], {type: imgtype});
};

var deco = document.getElementById("main");
var img = document.getElementById("imgShow");
var filenameInput = document.getElementById("filename");

function toFile() {
    if (!deco.value)
        return;

    var b = convertBase64ToBlob(deco.value);

    if (!filenameInput.value) {
        alert("请输入文件名称");
        return;
    }
    objectUrl = window.URL.createObjectURL(b);
    a = document.createElement('a');
    a.href = objectUrl;
    a.download = filenameInput.value;
    a.click();
    a.remove();
    window.URL.revokeObjectURL(objectUrl);
}

function showImg() {
    if (deco.value) {
        img.src = deco.value;
    }
}

(function () {

    deco.addEventListener('input', function () {
        var base64 = deco.value;

        var base64Arr = base64.split(',');
        var imgtype = '';
        var base64String = '';

        if (base64Arr.length > 1) {
            //如果是图片base64，去掉头信息
            base64String = base64Arr[1];
            imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':') + 1, base64Arr[0].indexOf(';'));

            //alert(imgtype);
            if (imgtype.indexOf("image") >= 0) {
                showImg();
            }
        } else {
        }


    }, false);


})();