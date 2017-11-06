
ngapp.controller('About', function ($scope, $http, $uibModal, $filter) {

    var d = pocketObjInit();
    d.postPath = '/Home';
    d.postTarget = 'About';
    $http.post(ws2('Shared', "QueryObjInit"), { type: d.postTarget }).success(function ($data) { d.queryObj = $data; cl('default queryObj', d.queryObj); });
    $http.post(ws2('Shared', "DataObjInit"), { type: d.postTarget }).success(function ($data) { d.dataObj = $data; cl('default dataObj', d.dataObj); });

    $scope.Search = function (queryObj) {

        $http.post(ws2(d.postPath, d.postTarget + 'Search'), { q: queryObj })
            .success(function ($ret) {
                //只需抓一筆
                if ($ret.data2 > 0) {
                    d.datas = $ret.data1;
                    d.dataObj = $ret.data1[0];
                }
                cl('dataObj', d.dataObj);
                d.errorCode = $ret.errorCode;
                cl('errorCode', d.errorCode);

                //餵給ckeditor內容
                CKEDITOR.instances.txtContent.setData(d.dataObj.content);
            }).error(errorcallback);

    };

    $scope.Save = function () {
        //取得ckeditor內容
        d.dataObj.content = CKEDITOR.instances.txtContent.getData();
        d.dataObj.date_created = transMSDate(d.dataObj.date_created);
        d.dataObj.date_modify = transMSDate(d.dataObj.date_modify);

        $http.post(ws2(d.postPath, d.postTarget + 'Save'), { data: d.dataObj })
            .success(function ($ret) {
                if ($ret.isSuccess == true) {
                    dataObj = $ret.data1;
                    cl('save success, return dataObj', dataObj);
                    alert('success');
                }
                else {
                    alert('oops');
                }
            }).error(errorcallback);
    };

});


ngapp.controller('Join', function ($scope, $http, $uibModal, $filter) {

    var d = pocketObjInit();
    d.postPath = '/Home';
    d.postTarget = 'Join';
    $http.post(ws2('Shared', "QueryObjInit"), { type: d.postTarget }).success(function ($data) { d.queryObj = $data; cl('default queryObj', d.queryObj); });
    $http.post(ws2('Shared', "DataObjInit"), { type: d.postTarget }).success(function ($data) { d.dataObj = $data; cl('default dataObj', d.dataObj); });

    $scope.Search = function (queryObj) {

        $http.post(ws2(d.postPath, d.postTarget + 'Search'), { q: queryObj })
            .success(function ($ret) {

                if ($ret.data2 > 0) d.datas = $ret.data1;
                cl('datas', d.datas);
                errorCode = $ret.errorCode;
                cl('errorCode', errorCode);
                
            }).error(errorcallback);

    };

    $scope.Save = function () {

        d.dataObj.date_created = transMSDate(d.dataObj.date_created);
        d.dataObj.date_modify = transMSDate(d.dataObj.date_modify);

        $http.post(ws2(d.postPath, d.postTarget + 'Save'), { data: d.dataObj })
            .success(function ($ret) {
                if ($ret.isSuccess == true) {
                    d.dataObj = $ret.data1;
                    cl('save success, return dataObj', d.dataObj);
                    alert('success');
                }
                else {
                    alert('oops');
                }
            }).error(errorcallback);
    };

});







//var ZoomList = [], ProductList = [], HandcountList = [];


//ngapp.controller('default', function ($scope, $http, $uibModal, $filter) {
//    $scope.KeyWord = "";
//    $scope.DataTable = { Data: [], Count: 0, PageIndex: 1, PageRows: 10 };

//    $http.post(ws2(postPath, "ZoomList"), {}).success(function ($data) { ZoomList = $data.d; }).error(errorcallback);
//    //$http.post(postPath + "ZoomList", {}).success(function ($data) { ZoomList = $data.d; }).error(errorcallback);
//    $http.post(ws2(postPath, "ProductList"), {}).success(function ($data) { ProductList = $data.d; }).error(errorcallback);
//    //$http.post(postPath + "ProductList", {}).success(function ($data) { ProductList = $data.d; }).error(errorcallback);
//    $http.post(ws2(postPath, "HandcountList"), {}).success(function ($data) { HandcountList = $data.d; }).error(errorcallback);
//    //$http.post(postPath + "HandcountList", {}).success(function ($data) { HandcountList = $data.d; }).error(errorcallback);

//    $scope.Search = function () {
//        $http.post(ws2(postPath, "CourseList"), { KeyWord: $scope.KeyWord, PageIndex: $scope.DataTable.PageIndex, PageRows: $scope.DataTable.PageRows })
//            .success(function ($data) {
//                $scope.DataTable.Count = $data.d.Count;
//                $scope.DataTable.Data = $data.d.Data;
//            })
//            .error(errorcallback)
//    };

//    $scope.DetailModal = function ($COURSE) {
//        $uibModal.open({
//            animation: false, backdrop: 'static', keyboard: false, size: "lg",
//            templateUrl: '/class/ClassDetail.html?' + new Date().getTime(),
//            controller: 'ClassDetail',
//            resolve: { COURSE: function () { return $COURSE; }, REFLASH: function () { return $scope.Search; } }
//        });
//    };

//    $scope.Delete = function () {
//        var array = $scope.DataTable.Data;
//        var temp = [];
//        for (var i = 0; i < array.length; i++) {
//            if (array[i].del) {
//                temp.push(array[i].COURSE1);
//            }
//        }
//        $http.post(ws2(postPath, "CourseDelete"), { COURSE: temp })
//            .success(function ($data) { $scope.Search(); alert('刪除成功！'); }).error(errorcallback);
//    };

//    $scope.AuthCheck = function ($act) {
//        var isShow = false;
//        if (location.pathname.indexOf('MTCAB030') > -1) {
//            isShow = ($act === 'edit') ? true : false;
//        }
//        else {
//            isShow = ($act === 'edit') ? false : true;
//        }
//        return isShow;
//    };

//});

//ngapp.controller('ClassDetail', function ($scope, $http, $uibModalInstance, COURSE, REFLASH) {
//    var bm = new BaseModal($scope, $uibModalInstance);

//    $scope.for = window.for;
//    $scope.CourseAccordion = true;

//    $scope.Cancel = function () {
//        if (location.pathname.indexOf('MTCAB030.aspx') != -1)
//            window.location = window.location;
//        else
//            $uibModalInstance.close();        
//    };

//    $scope.Course = {
//        Data: { COURSE1: COURSE },
//        ZoomList: [], ProductList: [], HandcountList: [],
//        NullCOURSE: function () { return $scope.Course.Data.COURSE1 == null; },
//        Init: function () {
//            $scope.Course.ZoomList = ZoomList;
//            $scope.Course.ProductList = ProductList;
//            $scope.Course.HandcountList = HandcountList;
//            $scope.Course.Load();
//        },
//        Load: function () {
//            $http.post(ws2(postPath, "CourseItem"), { COURSE: COURSE }, { transformResponse: function ($data) { $data = JSON.parse($data); $data.d = transDate($data.d); return $data; } })
//                .success(function ($data) { $scope.Course.Data = $data.d; }).error(errorcallback);
//        },
//        Save: function () {
//            $http.post(ws2(postPath, "CourseSave"), { DTO: $scope.Course.Data })
//                .success(function ($data) { $scope.Course.Data = $data.d; COURSE = $data.d.COURSE1; alert('儲存成功！'); REFLASH() }).error(errorcallback);
//        }
//    }

//    $scope.Stu = {
//        KeyWord: "",
//        DataTable: { Data: [], Count: 0, PageIndex: 1, PageRows: 10 },
//        Selected: [],
//        Init: function () { $scope.Stu.Search(); $scope.Stu.MemberLoad(); },
//        Search: function () {
//            var HANDCOUNT = 0;
//            if ($scope.Course.Data.HANDCOUNT != null) HANDCOUNT = $scope.Course.Data.HANDCOUNT;
//            $http.post(ws2(postPath, "StuList"), { KeyWord: $scope.Stu.KeyWord, PageIndex: $scope.Stu.DataTable.PageIndex, PageRows: $scope.Stu.DataTable.PageRows, HANDCOUNT: HANDCOUNT, TOTALMIN: $scope.Schedule.GetTotalNowHR() })
//                .success(function ($data) {
//                    $scope.Stu.DataTable.Count = $data.d.Count;
//                    $scope.Stu.DataTable.Data = $data.d.Data;
//                    console.log($data.d.Data);
//                }).error(errorcallback);
//        },
//        MemberLoad: function () {
//            var HANDCOUNT = 0;
//            if ($scope.Course.Data.HANDCOUNT != null) HANDCOUNT = $scope.Course.Data.HANDCOUNT;
//            $http.post(ws2(postPath, "StuMember"), { COURSE: $scope.Course.Data.COURSE1, HANDCOUNT: HANDCOUNT })
//                .success(function ($data) {
//                    //console.log($data);
//                    //$scope.Stu.Selected = $data.d;
//                    if ($data.d.obj2 != null && $data.d.obj2.length > 0) {
//                        $scope.Stu.Selected = $scope.Stu.CombineLHRInfo($data.d.obj1, $data.d.obj2);
//                    }
//                    else {
//                        $scope.Stu.Selected = $data.d.obj1;
//                    }
//                    console.log($scope.Stu.Selected);

//                }).error(errorcallback);
//        },

//        CombineLHRInfo: function (t1, t2) {
//            for (var i = 0; i < t1.length; i++){
//                for (var j = 0; j < t2.length; j++) {

//                    if (t1[i].id == t2[j].id) { t1[i].LHRS = t2[j].LHRS; }

//                }
//            }
//            return t1;
//        },

//        Select: function ($s) {
//            var array = $scope.Stu.Selected;
//            if (array.length >= $scope.Course.Data.HANDCOUNT) { alert('超過人數上限！'); return; }
//            for (var i = 0; i < array.length; i++) {
//                if (array[i].id == $s.id) { alert('已選擇！'); return; }
//            }

//            var isOK = true;
//            //檢查要選擇的學生可用時數
//            if (isOK) { isOK = $scope.Schedule.CheckStuAvailableHRs($s); }
//            //console.log($s);
//            if (isOK) {
//                $http.post(ws2(postPath, "StuChange"), { COURSE: $scope.Course.Data.COURSE1, USERID: $s.id, ORDERNO: $s.ORDERNO ? $s.ORDERNO : "", flag: true })//加入orderno
//                    .success(function ($data) { /*array.push($s);*/$scope.Stu.Init(); }).error(errorcallback);
//            }

//        },
//        Save: function ($s) {
//            $http.post(ws2(postPath, "StuOrder"), { COURSE: $scope.Course.Data.COURSE1, USERID: $s.id, ORDERNO: $s.ORDERNO ? $s.ORDERNO : "" })
//                .success(function () { alert('儲存成功！'); }).error(errorcallback);
//        },
//        Delete: function ($s) {
//            $http.post(ws2(postPath, "StuChange"), { COURSE: $scope.Course.Data.COURSE1, USERID: $s.id, ORDERNO: $s.ORDERNO ? $s.ORDERNO : "", flag: false })//加入orderno 補上? $s.ORDERNO : "" 新增單筆資料時才能刪除
//                .success(function ($data) { /*$scope.Stu.Selected.remove($s);*/$scope.Stu.Init(); }).error(errorcallback);
//        }
//    };
//    $scope.Stu.MemberLoad();

//    $scope.Tch = {
//        KeyWord: "",
//        DataTable: { Data: [], Count: 0, PageIndex: 1, PageRows: 10 },
//        Selected: [],
//        Init: function () { $scope.Tch.Search(); $scope.Tch.MemberLoad(); },
//        Search: function () {
//            $http.post(ws2(postPath, "TchList"), { KeyWord: $scope.Tch.KeyWord, PageIndex: $scope.Tch.DataTable.PageIndex, PageRows: $scope.Tch.DataTable.PageRows })
//                .success(function ($data) {
//                    $scope.Tch.DataTable.Count = $data.d.Count;
//                    $scope.Tch.DataTable.Data = $data.d.Data;
//                }).error(errorcallback);
//        },
//        MemberLoad: function () {
//            //console.log($scope.Course.Data);
//            var HANDCOUNT = 0;
//            if ($scope.Course.Data.HANDCOUNT != null) HANDCOUNT = $scope.Course.Data.HANDCOUNT;
//            $http.post(ws2(postPath, "TchMember"), { COURSE: $scope.Course.Data.COURSE1, HANDCOUNT: HANDCOUNT })
//                .success(function ($data) { $scope.Tch.Selected = $data.d; }).error(errorcallback);
//        },
//        Select: function ($t) {
//            var array = $scope.Tch.Selected;
//            if (array.length >= 1) { alert('超過上限！'); return; }
//            for (var i = 0; i < array.length; i++) {
//                if (array[i].id == $t.id) { alert('已選擇！'); return; }
//            }
//            $http.post(ws2(postPath, "TchChange"), { COURSE: $scope.Course.Data.COURSE1, USERID: $t.id, flag: true })
//                .success(function ($data) { array.push($t); }).error(errorcallback);
//        },
//        Delete: function ($t) {
//            $http.post(ws2(postPath, "TchChange"), { COURSE: $scope.Course.Data.COURSE1, USERID: $t.id, flag: false })
//                .success(function ($data) { $scope.Tch.Selected.remove($t); }).error(errorcallback);
//        }
//    };
//    $scope.Tch.MemberLoad();

//    $scope.Schedule = {
//        errMsg: '',
//        HRWeak: 1,
//        FirstDT: { YYMMDD: new Date(), HH: 0, MM: 0 },
//        Data: [],
//        WeekObj: [
//            { dayNo: 1, name: '一', isChecked: false, HH: 0, MM: 0, hr: 0 },
//            { dayNo: 2, name: '二', isChecked: false, HH: 0, MM: 0, hr: 0 },
//            { dayNo: 3, name: '三', isChecked: false, HH: 0, MM: 0, hr: 0 },
//            { dayNo: 4, name: '四', isChecked: false, HH: 0, MM: 0, hr: 0 },
//            { dayNo: 5, name: '五', isChecked: false, HH: 0, MM: 0, hr: 0 },
//            { dayNo: 6, name: '六', isChecked: false, HH: 0, MM: 0, hr: 0 },
//            { dayNo: 0, name: '日', isChecked: false, HH: 0, MM: 0, hr: 0 },
//            ],
//        ruleObj: { YYMMDD: new Date(), HH: 0, MM: 0, dayNo: 0, dayName: '', hr: 0, timesWeek: 0 },
//        ruleArray: [],
//        Init: function () {
//            //課程防呆判斷需要學生資訊來判斷成功與否，因此需refresh學生資訊
//            $scope.Stu.MemberLoad();

//            $http.post(ws2(postPath, "ScheduleLoad"), { COURSE: $scope.Course.Data.COURSE1 })
//                .success(function ($data) {
//                    for (var i = 0; i < $data.d.length; i++) {
//                        $data.d[i].COURSE_DTS = new Date($data.d[i].COURSE_DTS);
//                        $data.d[i].COURSE_DTE = new Date($data.d[i].COURSE_DTE);
//                    }
//                    $scope.Schedule.Data = $data.d;
//                    $scope.Schedule.State();
//                }).error(errorcallback);

//        },

//        Create: function () {

//            //檢查user的規則設定是否合法
//            if ($scope.Schedule.ruleArray.length > 0) {
//                for (var i = 0; i < $scope.Schedule.ruleArray.length; i++) {
//                    var obj = $scope.Schedule.ruleArray[i];
//                    if (obj.hr <= 0 || obj.hr % 0.5 != 0) {
//                        $scope.Schedule.errMsg += '規則' + (i + 1) + ' 無效的課程時數\n';
//                    }
//                    if (obj.timesWeek < 0 || obj.timesWeek % 1 != 0) {
//                        $scope.Schedule.errMsg += '規則' + (i + 1) + ' 無效的週數\n';
//                    }
//                }
//            }
//            //有錯，跳錯誤訊息，離開
//            if ($scope.Schedule.errMsg != '') { alert($scope.Schedule.errMsg); $scope.Schedule.errMsg = ''; return; }

//            var isNeedAddLast = false;
//            if ($scope.Schedule.Data.length == 0) isNeedAddLast = true;

//            var ruleArray = angular.copy($scope.Schedule.ruleArray);
//            $(ruleArray).each(function () {

//                for (var times = 0; times < this.timesWeek; times++) {
//                    var t = new Date(this.YYMMDD.getFullYear(), this.YYMMDD.getMonth(), this.YYMMDD.getDate() + 7 * times, this.HH, this.MM, 0);

//                    var filterObj = $scope.Schedule.Data.filter(x => x.COURSE_DTS.getTime() === t.getTime());
//                    if (filterObj.length == 0) {
//                        $scope.Schedule.Data.push({
//                            SEQNO: -1,
//                            time: "", TOPIC: "0", COURSE_STATUS: "0",
//                            //COURSE_DTS: new Date(t.setDate(t.getDate() + 7 * times)),
//                            COURSE_DTS: new Date(t),
//                            COURSE_DTE: new Date(t.setMinutes(t.getMinutes() + this.hr * 60)),
//                        });
//                    }
//                }

//            });

//            $scope.Schedule.Data.sort(function (a, b) { return a.COURSE_DTS.getTime() <= b.COURSE_DTS.getTime() ? -1 : 1; });
//            $scope.Schedule.Data[0].TOPIC = "1";
//            if (isNeedAddLast) {
//                $scope.Schedule.Add("0");
//            }
//            $scope.Schedule.State();

//        },
//        Add: function (_topic) {
//            var topic = "3";
//            var t = null;
//            var hr = 1;

//            //如未指定topic參數，則預設為3
//            if (_topic != null) topic = _topic;

//            //抓到最後一個合法課程時間
//            var i = 1;
//            while (t == null) {
//                if ($scope.Schedule.Data.length - i < 0) { break; }
//                t = angular.copy($scope.Schedule.Data[$scope.Schedule.Data.length - i].COURSE_DTS);
//                i++;
//            }
//            //如抓不到就先設定現在時間
//            if (t == null) {
//                t = new Date(
//                    $scope.Schedule.FirstDT.YYMMDD.getFullYear(),
//                    $scope.Schedule.FirstDT.YYMMDD.getMonth(),
//                    $scope.Schedule.FirstDT.YYMMDD.getDate(),
//                    0, 0, 0);
//            }
            
//            //如有建立規則的情況
//            if ($scope.Schedule.ruleArray.length > 0) {
//                var ruleArray = angular.copy($scope.Schedule.ruleArray).sort(function (a, b) { return a.dayNo <= b.dayNo ? -1 : 1; });
//                console.log(ruleArray);

//                while (true) {
//                    //t.setDate(t.getDate() + 1);
//                    //console.log(t);
//                    var filterObj = $scope.Schedule.Data.filter(x => x.COURSE_DTS.getTime() === t.getTime());
//                    //console.log(filterObj);

//                    //代表目前課程列表未有相同的課程時間
//                    if (filterObj.length <= 0) {
//                        var isMatch = false;
//                        $(ruleArray).each(function () {
//                            //有符合的規則就產生出一筆課程出來
//                            if (this.dayNo === t.getDay()) {
//                                t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), this.HH, this.MM, 0);
//                                hr = this.hr;

//                                isMatch = true;
//                                return true;
//                            }
//                        });
//                        //console.log(isMatch);
//                        if (isMatch === true) break;
//                    }
//                    t.setDate(t.getDate() + 1);
//                }
//            }
//            //如未有建立規則
//            else {
                
//            }

//            $scope.Schedule.Data.push({
//                SEQNO: -1,
//                time: "", TOPIC: topic, COURSE_STATUS: "0",
//                COURSE_DTS: new Date(t),
//                COURSE_DTE: new Date(t.setMinutes(t.getMinutes() + hr * 60)),
//            });

//            $scope.Schedule.State();
//        },
//        Delete: function ($r) {
//            $http.post(ws2(postPath, "ScheduleDelete"), { COURSE: $scope.Course.Data.COURSE1, SEQNO: $r.SEQNO })
//                .success(function () {
//                    $scope.Schedule.Data.remove($r);
//                    $scope.Schedule.State();
//                }).error(errorcallback);
//        },
//        State: function () {
            
//            var array = $scope.Schedule.Data;
//            var time = 1;
//            for (var i = 0; i < array.length; i++) {
//                if (array[i].COURSE_STATUS == "4" || array[i].COURSE_STATUS == "6" || array[i].COURSE_STATUS == "7") {
//                    array[i].time = "-";
//                } else if (array[i].TOPIC == "1") {
//                    array[i].time = "MEET";
//                } else if (array[i].TOPIC == "2") {
//                    array[i].time = "TEST";
//                } else if (array[i].TOPIC == "0" || array[i].TOPIC == "3") {
//                    array[i].time = time++;
//                } else {
//                    array[i].time = "";
//                }

//                if (array[i].ERRCODE != null) {
//                    var alertMsg = '';
//                    for (var j = 0; j < array[i].ERRCODE.length; j++) {
//                        switch (array[i].ERRCODE[j]) {
//                            case 121: alertMsg += '教師課程時間衝突。'; break;
//                            case 122: alertMsg += '學生課程時間衝突。'; break;
//                            case 123: alertMsg += '重複的上課時間。'; break;
//                            case 124: alertMsg += '上課時間(起)不可比上課時間(訖)晚。'; break;
//                            default: break;
//                        }
//                    }
//                    $scope.Schedule.Data[i].alertMsg = alertMsg;
//                }
//            }
//        },
//        Clear: function () {
//            var array = $scope.Schedule.Data;
//            for (var i = array.length - 1; i >= 0; i--) {
//                if (array[i].SEQNO < 0) { array.remove(array[i]); }
//            }
//            $scope.Schedule.State();
//        },
//        Save: function ($r) {
//            $r.ERRCODE = [];
//            var isOK = true;

//            var filterObj = $scope.Schedule.Data.filter(x => x.COURSE_DTS.getTime() === $r.COURSE_DTS.getTime());
//            if (filterObj.length > 1) {
//                //$scope.Schedule.errMsg += '[' + $r.time + '] 重複的上課時間\n'; isOK = false;
//                $r.ERRCODE = [123]; isOK = false;
//            }
//            if ($r.COURSE_DTS.getTime() > $r.COURSE_DTE.getTime()) {
//                //$scope.Schedule.errMsg += '[' + $r.time + '] 上課時間(起)不可比上課時間(訖)晚\n'; isOK = false;
//                $r.ERRCODE = [124]; isOK = false;
//            }
//            //需另外檢查是否超過最大課程時數
//            if (isOK) { isOK = $scope.Schedule.CheckCourseMaxHR(); }
//            //學生的可用時數判斷
//            if (isOK) { isOK = $scope.Schedule.CheckAllStuAvailableHRs(); }
//            //無超過最大限制時數, 可接著執行
//            if (isOK) {

//                //console.log($scope.Stu.Selected);
//                var StuUSERID_array = [];
//                for (var i = 0; i < $scope.Stu.Selected.length; i++) {
//                    StuUSERID_array.push($scope.Stu.Selected[i].id);
//                }
//                $http.post(ws2(postPath, "TchAndStuScheduleCheck"), { COURSE: $scope.Course.Data.COURSE1, TchUSERID: $scope.Tch.Selected[0].id, StuUSERID: StuUSERID_array, COURSE_DTS: $r.COURSE_DTS, COURSE_DTE: $r.COURSE_DTE })
//                    .success(function ($data) {
//                        //console.log('TchAndStuScheduleCheck: ');
//                        //console.log($data);
//                        if ($data.d.length > 0) {
//                            $r.ERRCODE = $data.d;
//                        }
//                        else {
//                            //console.log($r);
//                            $http.post(ws2(postPath, "ScheduleSave"), { COURSE: $scope.Course.Data.COURSE1, SEQNO: $r.SEQNO, TOPIC: $r.TOPIC, COURSE_DTS: $r.COURSE_DTS, COURSE_DTE: $r.COURSE_DTE })
//                                .success(function ($data) {
//                                    //console.log($data);
//                                    $r.SEQNO = $data.d;
//                                }).error(errorcallback);
//                        }
//                        $scope.Schedule.State();
//                    }).error(errorcallback);
//            }
//            else {
//                $scope.Schedule.State();
//            }

//        },
//        SaveAll: function () {
//            var array = $scope.Schedule.Data;
//            console.log(array);

//            //當下課程最大時數限制判斷
//            var isOK = $scope.Schedule.CheckCourseMaxHR();
//            //學生的可用時數判斷
//            if (isOK) { isOK = $scope.Schedule.CheckAllStuAvailableHRs(); }
//            //無超過最大限制時數, 可接著執行
//            if (isOK) {
//                for (var i = 0; i < array.length; i++) {
//                    $scope.Schedule.Save(array[i]);
//                }
//            }
//        },

//        //新增規則
//        CreateRule: function () {
//            var r = angular.copy($scope.Schedule.ruleObj);
//            $scope.Schedule.ruleArray.push(r);

//            $scope.Schedule.UpdateWeekName();
//        },
//        //刪除規則
//        DeleteRule: function ($w) {
//            $scope.Schedule.ruleArray.remove($w);
//        },

//        //更新星期幾顯示
//        UpdateWeekName: function () {
//            $($scope.Schedule.ruleArray).each(function () {
//                this.YYMMDD = new Date(this.YYMMDD.getFullYear(), this.YYMMDD.getMonth(), this.YYMMDD.getDate(), 0, 0, 0);
//                var dayNo = this.YYMMDD.getDay();
//                this.dayNo = dayNo;
//                this.dayName = $scope.Schedule.WeekObj.filter(x => x.dayNo === this.YYMMDD.getDay()).map(x => x.name)[0];
//            });

//            //console.log($scope.Schedule.ruleArray);
//        },

//        ErrorShowCheck: function (alertMsg) {
//            //console.log($ErrorCode);
//            return (alertMsg == '' || alertMsg == null) ? false : true;
//        },

//        //判斷目前排程中的課程時數是否有超過課程最大限制時數
//        CheckCourseMaxHR: function () {

//            var isOK = true;

//            var nowTotalMin = $scope.Schedule.GetTotalNowHR();

//            if (nowTotalMin > $scope.Course.Data.LENGTH * 60) {
//                console.log(nowTotalMin);
//                isOK = false;
//                alert('此課程的所有排課時數總和已超過指定課程時數' + $scope.Course.Data.LENGTH);
//            }

//            return isOK;
//        },

//        //計算目前所產生的時數總和
//        GetTotalNowHR: function () {
//            var nowTotalMin = 0;
//            var array = $scope.Schedule.Data;
//            for (var i = 0; i < array.length; i++) {
//                if (array[i].TOPIC != "1") {
//                    //MEET的課堂時數不需算進去
//                    nowTotalMin += (new Date(array[i].COURSE_DTE).getTime() - new Date(array[i].COURSE_DTS).getTime()) / 60000;
//                }
//            }
//            console.log(nowTotalMin);
//            return nowTotalMin;
//        },

//        CheckAllStuAvailableHRs: function () {
//            var isOK = true;
//            var errMsg = '';
//            var nowTotalMin = $scope.Schedule.GetTotalNowHR();
            
//            var stuArray = $scope.Stu.Selected;
//            console.log(stuArray);
//            for (var i = 0; i < stuArray.length; i++) {
//                var name = stuArray[i].name;
//                if (stuArray[i].LHRS * 60 < nowTotalMin) {
//                    isOK = false;
//                    errMsg += name + ' 的剩餘時數已不足\n';
//                }
//            }
//            if (isOK == false) { alert(errMsg); }
//            return isOK;
//        },
//        CheckStuAvailableHRs: function (stu) {
//            var isOK = true;
//            var errMsg = '';
//            var nowTotalMin = $scope.Schedule.GetTotalNowHR();

//            var name = stu.name;
//            if (stu.LHRS * 60 < nowTotalMin) {
//                isOK = false;
//                errMsg += name + ' 的剩餘時數已不足\n';
//            }

//            if (isOK == false) { alert(errMsg); }
//            return isOK;
//        },

//    };
//    $scope.Schedule.Init();

//});