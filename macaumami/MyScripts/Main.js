window.pocketObjInit = function () {
    var obj = {
        postPath : '',
        postTarget: '',
        queryObj : null,
        dataObj : null,
        datas : [],
        errorCode : [],
    }

    return obj;
}

//console = { log: function () { } };
window.cl = function (objTitle, obj) {
    console.log(objTitle);
    console.log(obj);
};

window.transMSDate = function (_date) {
    return new Date(parseInt(_date.replace('/Date(', '').replace(')/', '')));
};

window.DeleteConfirm = function () {
    return confirm("確定刪除？");
}

window.errorcallback = function ($data) {
    console.log($data);
    ExceptionFilter($data);
};

window.for = function ($i) {
    var temp = [];
    for (var i = 0; i < $i; i++) {
        temp[i] = i;
    }
    return temp;
}

window.ws = function ($method) {
    return window.location.pathname + "/" + $method;
}
window.ws2 = function ($path, $method) {
    return $path + "/" + $method;
}

window.ExceptionFilter = function ($object) {
    if ($object.ExceptionType == "MTC.Survey.MessageException") {
        alert($object.Message);
    }
}

window.UploadOption = function ($url, $d) {
    return {
        url: $url,
        method: "POST",
        data: $d,
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined }
    };
};

window.transDate = function ($data) {
    if (angular.isArray($data)) {
        for (var i = 0; i < $data.length; i++) {
            window.transDate($data[i]);
        }
    } else {
        for (var p in $data) {
            if (typeof ($data[p]) == "string" && $data[p].isMSDate()) {
                $data[p] = $data[p].toDate();
            }
        }
    }
    return $data;
};

/* String擴充 */
if (!String.prototype.isMSDate) {
    String.prototype.isMSDate = function () {
        var result = this.match(/\/Date\((-)?\d+\)\//);
        return result != null;
    };
}

if (!String.prototype.toDate) {
    String.prototype.toDate = function () {
        var stamp = this.match(/(-)?\d+/);
        if (stamp == null) { return new Date(); } else { stamp = stamp[0]; }
        return new Date(parseInt(stamp));
    };
}

/* Array 擴充 */
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this == null) { throw new TypeError('Array.prototype.find called on null or undefined'); }
        if (typeof predicate !== 'function') { throw new TypeError('predicate must be a function'); }

        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function () {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    };
}