var map; //地图
var client;
var judgement = true; //judgement判断是否是第一次发送消息来确定是否想后端请求数据
var judgement1 = true; //judgement$ 用来判断是否是第一次标注marker$
var judgement2 = true;
var judgement3 = true;
var judgement4 = true;
var judgementMap = true; //地图跟随 判断条件
var judgementLayer = true; //图层切换 判断条件
var judgementUserInfo = true; //用户信息盒 判断条件
var judgementPolyline = true; //航线显示 判断条件
var judgementHeatMap = true;
var judgementAirDataBox1 = true; // 空气数据盒$ 判断条件
var judgementAirDataBox2 = true;
var judgementAirDataBox3 = true;
var judgementAirDataBox4 = true;
var judgementAirplane1 = true; //视频盒$ 判断条件
var judgementAirplane2 = true;
var judgementAirplane3 = true;
var judgementAirplane4 = true;
var judgementFlyOrDrive = true; //判断显示的是飞行数据还是驾驶操作
var userInfo = [];
var topicList = []; //mqtt  topic数组
var deviceInfo = []; //设备信息
var deviceName = [];
var deviceEmail = []; //邮箱带@和.
var deviceEmailPlus = []; //邮箱不带@和.
var data1 = []; //data$  接受 根据 topicList[$] 接受的数据
var data2 = [];
var data3 = [];
var data4 = [];
var datas1 = []; //datas$ 存放转换坐标系后的 经纬度坐标
var datas2 = [];
var datas3 = [];
var datas4 = [];
var dataArray1 = []; //dataArray$ 由datas$组成的数组
var dataArray2 = [];
var dataArray3 = [];
var dataArray4 = [];
var marker1; // marker$ 根据经纬度坐标在地图上标记的点
var marker2;
var marker3;
var marker4;
var markerList1 = []; //markerList$ 由marker$组成的数组
var markerList2 = [];
var markerList3 = [];
var markerList4 = [];
var lnglats1; //转换坐标后的 对象 datas$的值就从 lnglats$ 中读取
var lnglats2;
var lnglats3;
var lnglats4;
var path1 = []; //航线的path
var path2 = [];
var path3 = [];
var path4 = [];
var polyline1; //航线
var polyline2;
var polyline3;
var polyline4;
var timer; //地图跟随用的定时器
var timer1; //地图平移用的定时器
var timer2; //画热力图用的定时器
// 第一架飞机热力图层  和  判断是否画图层
var heatDataSo21 = [];
var heatDataO31 = [];
var heatDataNo21 = [];
var heatDataCo1 = [];
var heatDataPM251 = [];
var heatDataPM101 = [];
var layerSo21;
var layerO31;
var layerNO21;
var layerCO1;
var layerPM251;
var layerPM101;
var jgSo21;
var jgO31;
var jgNo21;
var jgCo1;
var jgPM251;
var jgPM101;
// 第二架飞机热力图层  和  判断是否画图层
var heatDataSo22 = [];
var heatDataO32 = [];
var heatDataNo22 = [];
var heatDataCo2 = [];
var heatDataPM252 = [];
var heatDataPM102 = [];
var heatDataPM101 = [];
var layerSo22;
var layerO32;
var layerNO22;
var layerCO2;
var layerPM252;
var layerPM102;
var jgSo22;
var jgO32;
var jgNo22;
var jgCo2;
var jgPM252;
var jgPM102;
// 第三架飞机热力图层  和  判断是否画图层
var heatDataSo23 = [];
var heatDataO33 = [];
var heatDataNo23 = [];
var heatDataCo3 = [];
var heatDataPM253 = [];
var heatDataPM103 = [];
var heatDataPM101 = [];
var layerSo23;
var layerO33;
var layerNO23;
var layerCO3;
var layerPM253;
var layerPM103;
var jgSo23;
var jgO33;
var jgNo23;
var jgCo3;
var jgPM253;
var jgPM103;
// 第四架飞机热力图层  和  判断是否画图层
var heatDataSo24 = [];
var heatDataO34 = [];
var heatDataNo24 = [];
var heatDataCo4 = [];
var heatDataPM254 = [];
var heatDataPM104 = [];
var heatDataPM101 = [];
var layerSo24;
var layerO34;
var layerNO24;
var layerCO4;
var layerPM254;
var layerPM104;
var jgSo24;
var jgO34;
var jgNo24;
var jgCo4;
var jgPM254;
var jgPM104;

var requestControl = {
    "Type": "RequestControl"
};
var takeOff = {
    "Type": "Control",
    "Action": "TakeOff"
};
var land = {
    "Type": "Control",
    "Action": "Land"
};
var goHome = {
    "Type": "Control",
    "Action": "GoHome"
};
var moveTop = {
    "Type": "Control",
    "Action": "Move",
    "Throttle": 0,
    "Yaw": 0,
    "Roll": 1,
    "Pitch": 0
}
var moveBottom = {
    "Type": "Control",
    "Action": "Move",
    "Throttle": 0,
    "Yaw": 0,
    "Roll": -1,
    "Pitch": 0
};
var moveLeft = {
    "Type": "Control",
    "Action": "Move",
    "Throttle": 0,
    "Yaw": 0,
    "Roll": 0,
    "Pitch": -1
};
var moveRight = {
    "Type": "Control",
    "Action": "Move",
    "Throttle": 0,
    "Yaw": 0,
    "Roll": 0,
    "Pitch": 1
};
var turnLeft = {
    "Type": "Control",
    "Action": "Move",
    "Throttle": 0,
    "Yaw": -1,
    "Roll": 0,
    "Pitch": 0
};
var turnRight = {
    "Type": "Control",
    "Action": "Move",
    "Throttle": 0,
    "Yaw": 1,
    "Roll": 0,
    "Pitch": 0
};
var turnUp = {
    "Type": "Control",
    "Action": "Move",
    "Throttle": 1,
    "Yaw": 0,
    "Roll": 0,
    "Pitch": 0
};
var turnDown = {
    "Type": "Control",
    "Action": "Move",
    "Throttle": -1,
    "Yaw": 0,
    "Roll": 0,
    "Pitch": 0
};
//js数组添加不重复元素
Array.prototype.pushNoRepeat = function () {
    for (var i = 0; i < arguments.length; i++) {
        var ele = arguments[i];
        if (this.indexOf(ele) == -1) {
            this.push(ele);
        }
    }
};
map = new AMap.Map('mapContain', {
    center: [118.0017, 36.8102],
    layers: [
        new AMap.TileLayer.Satellite()
    ],
    zooms: [4, 18],
    zoom: 15,
    viewMode: '2D'
});
overLayGroupSo2 = new AMap.OverlayGroup();
// 请求从数据库读取的值,并用此值进行mqtt连接
let xhr = new XMLHttpRequest();
xhr.open("GET", "ajax.php");
xhr.send(null);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        userInfo = xhr.response.split(",");
        document.getElementById("name").innerHTML = userInfo[1];
        document.getElementById("email").innerHTML = userInfo[2];
        document.getElementById("telePhone").innerHTML = userInfo[7];
        var hostname = '47.93.235.9',
            port = 1884,
            clientId = "qx/em/server/" + userInfo[2],
            timeout = 30,
            keepAlive = 50,
            cleanSession = false,
            ssl = false,
            // 自己用服务器测试用的账号密码
            // userName = 'mosquitto',
            // password = 'mosquitto',
            userName = 'qx_account',
            password = 'qxaccount',
            // topic = "wolaila/em/device/" + userInfo[0] + "/#";
            topic = "qx/em/device/" + userInfo[0] + "/#";
        client = new Paho.MQTT.Client(hostname, port, clientId);
        var options = {
            invocationContext: {
                host: hostname,
                port: port,
                path: client.path,
                clientId: clientId
            },
            timeout: timeout,
            keepAliveInterval: keepAlive,
            cleanSession: cleanSession,
            useSSL: ssl,
            userName: userName,
            password: password,
            onSuccess: onConnect,
            onFailure: function (e) {
                console.log(e);
            }
        };

        function onConnect() {
            alert("连接成功");
            client.subscribe(topic);
        };

        function onMessageArrived(message) {
            if (JSON.parse(message.payloadString).Type == "Data") {
                topicList.pushNoRepeat(message.destinationName);
                if (topicList.length == 1) {
                    //js把topic传回php,然后根据邮箱在数据库取值,然后再发回前端填表
                    $.ajax({
                        type: "post",
                        url: "../login.php",
                        data: {
                            topicString: message.destinationName
                        },
                        dataType: "text",
                        success: function () {
                            let xhr = new XMLHttpRequest();
                            xhr.open('GET', 'ajax.php');
                            xhr.send(null);
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === 4 && xhr.status === 200) {
                                    deviceInfo = xhr.response.split(",");
                                    deviceEmailPlus.pushNoRepeat(deviceInfo[6]);
                                    deviceEmail.pushNoRepeat(deviceInfo[6].replace("@", "").replace(".", ""));
                                    deviceName.pushNoRepeat(deviceInfo[4]);
                                    document.getElementById("username1").innerHTML = deviceName[0];
                                }
                            };
                            judgement = false;
                        },
                        error: function (e) {
                            console.log(e.status);
                            console.log(e.responseText);
                        }
                    });
                }
                if (topicList.length == 2) {
                    //js把topic传回php,然后根据邮箱在数据库取值,然后再发回前端填表
                    $.ajax({
                        type: "post",
                        url: "../login.php",
                        data: {
                            topicString: message.destinationName
                        },
                        dataType: "text",
                        success: function () {
                            let xhr = new XMLHttpRequest();
                            xhr.open('GET', 'ajax.php');
                            xhr.send(null);
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === 4 && xhr.status === 200) {
                                    deviceInfo = xhr.response.split(",");
                                    deviceEmailPlus.pushNoRepeat(deviceInfo[6]);
                                    deviceEmail.pushNoRepeat(deviceInfo[6].replace("@", "").replace(".", ""));
                                    deviceName.pushNoRepeat(deviceInfo[4]);
                                    document.getElementById("username2").innerHTML = deviceName[1];
                                }
                            };
                            judgement = false;
                        },
                        error: function (e) {
                            console.log(e.status);
                            console.log(e.responseText);
                        }
                    });
                }
                if (topicList.length == 3) {
                    //js把topic传回php,然后根据邮箱在数据库取值,然后再发回前端填表
                    $.ajax({
                        type: "post",
                        url: "../login.php",
                        data: {
                            topicString: message.destinationName
                        },
                        dataType: "text",
                        success: function () {
                            let xhr = new XMLHttpRequest();
                            xhr.open('GET', 'ajax.php');
                            xhr.send(null);
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === 4 && xhr.status === 200) {
                                    deviceInfo = xhr.response.split(",");
                                    deviceEmailPlus.pushNoRepeat(deviceInfo[6]);
                                    deviceEmail.pushNoRepeat(deviceInfo[6].replace("@", "").replace(".", ""));
                                    deviceName.pushNoRepeat(deviceInfo[4]);
                                    document.getElementById("username3").innerHTML = deviceName[2];
                                }
                            };
                            judgement = false;
                        },
                        error: function (e) {
                            console.log(e.status);
                            console.log(e.responseText);
                        }
                    });
                }
                if (topicList.length == 4) {
                    //js把topic传回php,然后根据邮箱在数据库取值,然后再发回前端填表
                    $.ajax({
                        type: "post",
                        url: "../login.php",
                        data: {
                            topicString: message.destinationName
                        },
                        dataType: "text",
                        success: function () {
                            let xhr = new XMLHttpRequest();
                            xhr.open('GET', 'ajax.php');
                            xhr.send(null);
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === 4 && xhr.status === 200) {
                                    deviceInfo = xhr.response.split(",");
                                    deviceEmailPlus.pushNoRepeat(deviceInfo[6]);
                                    deviceEmail.pushNoRepeat(deviceInfo[6].replace("@", "").replace(".", ""));
                                    deviceName.pushNoRepeat(deviceInfo[4]);
                                    document.getElementById("username4").innerHTML = deviceName[3];
                                }
                            };
                            judgement = false;
                        },
                        error: function (e) {
                            console.log(e.status);
                            console.log(e.responseText);
                        }
                    });
                }
                // DOM操作  视频盒子和飞机数据盒
                switch (topicList.length) {
                    case 1:
                        document.getElementById("airplane1").style.display = "block";
                        document.getElementById("numOfAir").innerHTML = 1;
                        document.getElementById("plane1").style.color = "red";
                        if (judgementAirplane1) {
                            document.getElementById("videoBox1").style.display = "block";
                        } else {
                            document.getElementById("videoBox1").style.display = "none";
                        }
                        if (!judgementFlyOrDrive) {
                            document.getElementById('airdrive1').style.display = "block";
                        }
                        break;
                    case 2:
                        document.getElementById("airplane2").style.display = "block";
                        document.getElementById("numOfAir").innerHTML = 2;
                        document.getElementById("plane2").style.color = "yellow";
                        document.getElementById("videoBox1").style.width = "444px";
                        document.getElementById("videoBox1").style.height = "250px";
                        if (judgementAirplane1) {
                            document.getElementById("videoBox1").style.display = "block";
                        } else {
                            document.getElementById("videoBox1").style.display = "none";
                        }
                        if (judgementAirplane2) {
                            document.getElementById("videoBox2").style.display = "block";
                        } else {
                            document.getElementById("videoBox2").style.display = "none";
                        }
                        if (!judgementFlyOrDrive) {
                            document.getElementById('airdrive1').style.display = "block";
                            document.getElementById('airdrive2').style.display = "block";
                        }
                        break;
                    case 3:
                        document.getElementById("airplane3").style.display = "block";
                        document.getElementById("numOfAir").innerHTML = 3;

                        document.getElementById("plane3").style.color = "pink";
                        if (judgementAirplane1) {
                            document.getElementById("videoBox1").style.display = "block";
                        } else {
                            document.getElementById("videoBox1").style.display = "none";
                        }
                        if (judgementAirplane2) {
                            document.getElementById("videoBox2").style.display = "block";
                        } else {
                            document.getElementById("videoBox2").style.display = "none";
                        }
                        if (judgementAirplane3) {
                            document.getElementById("videoBox3").style.display = "block";
                        } else {
                            document.getElementById("videoBox3").style.display = "none";
                        }
                        if (!judgementFlyOrDrive) {
                            document.getElementById('airdrive1').style.display = "block";
                            document.getElementById('airdrive2').style.display = "block";
                            document.getElementById('airdrive3').style.display = "block";
                        }
                        break;
                    case 4:
                        document.getElementById("airplane4").style.display = "block";
                        document.getElementById("numOfAir").innerHTML = 4;
                        document.getElementById("plane4").style.color = "green";

                        // document.getElementById("videoBox3").style.right = "65px";
                        if (judgementAirplane1) {
                            document.getElementById("videoBox1").style.display = "block";
                        } else {
                            document.getElementById("videoBox1").style.display = "none";
                        }
                        if (judgementAirplane2) {
                            document.getElementById("videoBox2").style.display = "block";
                        } else {
                            document.getElementById("videoBox2").style.display = "none";
                        }
                        if (judgementAirplane3) {
                            document.getElementById("videoBox3").style.display = "block";
                        } else {
                            document.getElementById("videoBox3").style.display = "none";
                        }
                        if (judgementAirplane4) {
                            document.getElementById("videoBox4").style.display = "block";
                        } else {
                            document.getElementById("videoBox4").style.display = "none";
                        }
                        if (!judgementFlyOrDrive) {
                            document.getElementById('airdrive1').style.display = "block";
                            document.getElementById('airdrive2').style.display = "block";
                            document.getElementById('airdrive3').style.display = "block";
                            document.getElementById('airdrive4').style.display = "block";
                        }
                        break;
                    default:
                        document.getElementById("numOfAir").innerHTML = 0;
                        break;

                }
                // 消息分类
                if (message.destinationName == topicList[0]) {
                    data1 = JSON.parse(message.payloadString);
                    if (data1.Temperature === undefined) {
                        document.getElementById("lng1").innerHTML = data1.Longitude.substr(0, data1.Longitude.indexOf('.') + 6) + ' °';
                        document.getElementById("lat1").innerHTML = data1.Latitude.substr(0, data1.Latitude.indexOf('.') + 6) + '°';
                        document.getElementById("height1").innerHTML = data1.Height + 'm';
                    } else {
                        //console.log(typeof data1.Longitude);
                        console.log(2);
                        document.getElementById("lng1").innerHTML = data1.Longitude.substr(0, data1.Longitude.indexOf('.') + 6) + ' °';
                        document.getElementById("lat1").innerHTML = data1.Latitude.substr(0, data1.Latitude.indexOf('.') + 6) + '°';
                        document.getElementById("height1").innerHTML = data1.Height + ' m';
                        document.getElementById("SO211").innerHTML = data1.So2.substr(0, data1.So2.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("O311").innerHTML = data1.O3.substr(0, data1.O3.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("NO211").innerHTML = data1.No2.substr(0, data1.No2.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("CO11").innerHTML = data1.Co.substr(0, data1.Co.indexOf('.') + 2) + 'mg/m³';
                        document.getElementById("PM2.511").innerHTML = data1.Pm2_5.substr(0, data1.Pm2_5.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("PM1011").innerHTML = data1.Pm10.substr(0, data1.Pm10.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("VOC11").innerHTML = data1.Voc + 'ppb';
                        document.getElementById("temperature11").innerHTML = data1.Temperature + '℃';
                        document.getElementById("humidity11").innerHTML = data1.Humidity + '%';
                    }
                    var gps = [data1.Longitude, data1.Latitude];
                    AMap.convertFrom(gps, 'gps', function (status, result) {
                        if (result.info === 'ok') {
                            lnglats1 = result.locations[0];
                            var icon = new AMap.Icon({
                                size: new AMap.Size(40, 40),
                                image: '../images/plane.png',
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(40, 40)
                            });
                            if (judgement1) {
                                marker1 = new AMap.Marker({
                                    position: new AMap.LngLat(lnglats1.lng, lnglats1.lat),
                                    anchor: 'center',
                                    offset: new AMap.Pixel(0, 0),
                                    icon: icon,
                                    angle: data1.YawAngle, //偏移量 
                                    autoRotation: true, //自动旋转  
                                    map: map
                                });
                                console.log(1);
                                judgement1 = false;
                                map.add(marker1);

                            } else {
                                console.log(3);
                                marker1.on('click', function () {
                                    // judgementAirplane1 = !judgementAirplane1;
                                    // document.getElementById("videoBox1").style.display = 'none';
                                    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(requestControl), 0, false)

                                });
                                //marker.setPosition(new AMap.LngLat(lnglats.lng,lnglats.lat));
                                datas1[0] = lnglats1.lng;
                                datas1[1] = lnglats1.lat;
                                dataArray1.push(datas1);
                                for (var i = 0; i < dataArray1.length; i++) {
                                    marker1.setPosition(new AMap.LngLat(dataArray1[i][0], dataArray1[i][1]));
                                    markerList1.push(marker1);
                                };
                                for (var i = 0; i < markerList1.length; i++) {
                                    path1.push(markerList1[i].getPosition());
                                }
                                polyline1 = new AMap.Polyline({
                                    path: path1,
                                    borderWeight: 2,
                                    strokeColor: 'red',
                                    lineJoin: 'round',
                                    map: map
                                });
                                map.add(polyline1);
                                var heatDatasSo2 = {
                                    lng: lnglats1.lng,
                                    lat: lnglats1.lat,
                                    count: parseInt(data1.So2)
                                };
                                var heatDatasO3 = {
                                    lng: lnglats1.lng,
                                    lat: lnglats1.lat,
                                    count: parseInt(data1.O3)
                                };
                                var heatDatasNo2 = {
                                    lng: lnglats1.lng,
                                    lat: lnglats1.lat,
                                    count: parseInt(data1.No2)
                                };
                                var heatDatasCo = {
                                    lng: lnglats1.lng,
                                    lat: lnglats1.lat,
                                    count: parseInt(data1.Co)
                                };
                                var heatDatasPM25 = {
                                    lng: lnglats1.lng,
                                    lat: lnglats1.lat,
                                    count: parseInt(data1.Pm2_5)
                                };
                                var heatDatasPM10 = {
                                    lng: lnglats1.lng,
                                    lat: lnglats1.lat,
                                    count: parseInt(data1.Pm10)
                                };
                                heatDataSo21.push(heatDatasSo2);
                                heatDataO31.push(heatDatasO3);
                                heatDataNo21.push(heatDatasNo2);
                                heatDataCo1.push(heatDatasCo);
                                heatDataPM251.push(heatDatasPM25);
                                heatDataPM101.push(heatDatasPM10);
                                //  SO2 1
                                if (document.getElementById('SO21').checked) {
                                    if (layerSo21 == undefined) {
                                        layerSo21 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgSo21 = true;
                                    drawHeatMap(heatDataSo21, layerSo21, jgSo21);
                                } else {
                                    if (layerSo21 != undefined) {
                                        map.remove(layerSo21);
                                        layerSo21 = undefined;
                                    }
                                    jgSo21 = false;
                                    drawHeatMap(heatDataSo21, layerSo21, jgSo21);
                                }
                                // O3 1
                                if (document.getElementById('O31').checked) {
                                    if (layerO31 == undefined) {
                                        layerO31 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgO31 = true;
                                    drawHeatMap(heatDataO31, layerO31, jgO31);
                                } else {
                                    if (layerO31 != undefined) {
                                        map.remove(layerO31);
                                        layerO31 = undefined;
                                    }
                                    jgO31 = false;
                                    drawHeatMap(heatDataO31, layerO31, jgO31);
                                }
                                // NO2 1
                                if (document.getElementById('NO21').checked) {
                                    if (layerNO21 == undefined) {
                                        layerNO21 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgNo21 = true;
                                    drawHeatMap(heatDataNo21, layerNO21, jgNo21);
                                } else {
                                    if (layerNO21 != undefined) {
                                        map.remove(layerNO21);
                                        layerNO21 = undefined;
                                    }
                                    jgNo21 = false;
                                    drawHeatMap(heatDataNo21, layerNO21, jgNo21);
                                }
                                // CO 1
                                if (document.getElementById('CO1').checked) {
                                    if (layerCO1 == undefined) {
                                        layerCO1 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgCo1 = true;
                                    drawHeatMap(heatDataCo1, layerCO1, jgCo1);
                                } else {
                                    if (layerCO1 != undefined) {
                                        map.remove(layerCO1);
                                        layerCO1 = undefined;
                                    }
                                    jgCo1 = false;
                                    drawHeatMap(heatDataCo1, layerCO1, jgCo1);
                                }
                                //PM2.5 1
                                if (document.getElementById('PM251').checked) {
                                    if (layerPM251 == undefined) {
                                        layerPM251 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgPM251 = true;
                                    drawHeatMap(heatDataPM251, layerPM251, jgPM251);
                                } else {
                                    if (layerPM251 != undefined) {
                                        map.remove(layerPM251);
                                        layerPM251 = undefined;
                                    }
                                    jgPM251 = false;
                                    drawHeatMap(heatDataPM251, layerPM251, jgPM251);
                                }
                                //PM10 1
                                if (document.getElementById('PM101').checked) {
                                    if (layerPM101 == undefined) {
                                        layerPM101 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgPM101 = true;
                                    drawHeatMap(heatDataPM101, layerPM101, jgPM101);
                                } else {
                                    if (layerPM101 != undefined) {
                                        map.remove(layerPM101);
                                        layerPM101 = undefined;
                                    }
                                    jgPM101 = false;
                                    drawHeatMap(heatDataPM101, layerPM101, jgPM101);
                                }
                            }

                        }
                    });

                }
                if (message.destinationName == topicList[1]) {
                    data2 = JSON.parse(message.payloadString);
                    if (data2.Temperature === undefined) {
                        document.getElementById("lng2").innerHTML = data2.Longitude.substr(0, data2.Longitude.indexOf('.') + 6) + ' °';
                        document.getElementById("lat2").innerHTML = data2.Latitude.substr(0, data2.Latitude.indexOf('.') + 6) + '°';
                        document.getElementById("height2").innerHTML = data2.Height + 'm';
                    } else {
                        document.getElementById("lng2").innerHTML = data2.Longitude.substr(0, data2.Longitude.indexOf('.') + 6) + ' °';
                        document.getElementById("lat2").innerHTML = data2.Latitude.substr(0, data2.Latitude.indexOf('.') + 6) + '°';
                        document.getElementById("height2").innerHTML = data2.Height + ' m';
                        document.getElementById("SO222").innerHTML = data2.So2.substr(0, data1.So2.indexOf('.') + 1) + 'μg/m³';
                        document.getElementById("O322").innerHTML = data2.O3.substr(0, data1.O3.indexOf('.') + 1) + 'μg/m³';
                        document.getElementById("NO222").innerHTML = data2.No2.substr(0, data1.No2.indexOf('.') + 1) + 'μg/m³';
                        document.getElementById("CO22").innerHTML = data2.Co.substr(0, data1.Co.indexOf('.') + 1) + 'mg/m³';
                        document.getElementById("PM2.522").innerHTML = data2.Pm2_5.substr(0, data1.Pm2_5.indexOf('.') + 1) + 'μg/m³';
                        document.getElementById("PM1022").innerHTML = data2.Pm10.substr(0, data1.Pm10.indexOf('.') + 1) + 'μg/m³';
                        document.getElementById("VOC22").innerHTML = data2.Voc + 'ppb';
                        document.getElementById("temperature22").innerHTML = data2.Temperature + '℃';
                        document.getElementById("humidity22").innerHTML = data2.Humidity + '%';
                    }
                    var gps = [data2.Longitude, data2.Latitude];
                    AMap.convertFrom(gps, 'gps', function (status, result) {
                        if (result.info === 'ok') {
                            lnglats2 = result.locations[0];
                            var icon = new AMap.Icon({
                                size: new AMap.Size(40, 40),
                                image: '../images/plane.png',
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(40, 40)
                            });
                            if (judgement2) {
                                marker2 = new AMap.Marker({
                                    position: new AMap.LngLat(lnglats2.lng, lnglats2.lat),
                                    anchor: 'center',
                                    offset: new AMap.Pixel(0, 0),
                                    icon: icon,
                                    angle: data2.YawAngle, //偏移量 
                                    autoRotation: true, //自动旋转  
                                    map: map
                                });
                                judgement2 = false;
                                map.add(marker2);
                            } else {
                                marker2.on('click', function () {
                                    // judgementAirplane2 = !judgementAirplane2;
                                    // document.getElementById("videoBox2").style.display = 'none';
                                    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(requestControl), 0, false)
                                });
                                //marker.setPosition(new AMap.LngLat(lnglats.lng,lnglats.lat));
                                datas2[0] = lnglats2.lng;
                                datas2[1] = lnglats2.lat;
                                dataArray2.push(datas2);
                                for (var i = 0; i < dataArray2.length; i++) {
                                    marker2.setPosition(new AMap.LngLat(dataArray2[i][0], dataArray2[i][1]));
                                    markerList2.push(marker2);
                                };
                                for (var i = 0; i < markerList2.length; i++) {
                                    path2.push(markerList2[i].getPosition());
                                }
                                polyline2 = new AMap.Polyline({
                                    path: path2,
                                    borderWeight: 2,
                                    strokeColor: 'red',
                                    lineJoin: 'round',
                                    map: map
                                });
                                map.add(polyline2);
                                var heatDatasSo2 = {
                                    lng: lnglats2.lng,
                                    lat: lnglats2.lat,
                                    count: parseInt(data2.So2)
                                };
                                var heatDatasO3 = {
                                    lng: lnglats2.lng,
                                    lat: lnglats2.lat,
                                    count: parseInt(data2.O3)
                                };
                                var heatDatasNo2 = {
                                    lng: lnglats2.lng,
                                    lat: lnglats2.lat,
                                    count: parseInt(data2.No2)
                                };
                                var heatDatasCo = {
                                    lng: lnglats2.lng,
                                    lat: lnglats2.lat,
                                    count: parseInt(data2.Co)
                                };
                                var heatDatasPM25 = {
                                    lng: lnglats2.lng,
                                    lat: lnglats2.lat,
                                    count: parseInt(data2.Pm2_5)
                                };
                                var heatDatasPM10 = {
                                    lng: lnglats2.lng,
                                    lat: lnglats2.lat,
                                    count: parseInt(data2.Pm10)
                                };
                                heatDataSo22.push(heatDatasSo2);
                                heatDataO32.push(heatDatasO3);
                                heatDataNo22.push(heatDatasNo2);
                                heatDataCo2.push(heatDatasCo);
                                heatDataPM252.push(heatDatasPM25);
                                heatDataPM102.push(heatDatasPM10);
                                //  SO2 2
                                if (document.getElementById('SO22').checked) {
                                    if (layerSo22 == undefined) {
                                        layerSo22 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgSo22 = true;
                                    drawHeatMap(heatDataSo22, layerSo22, jgSo22);
                                } else {
                                    if (layerSo22 != undefined) {
                                        map.remove(layerSo22);
                                        layerSo22 = undefined;
                                    }
                                    jgSo22 = false;
                                    drawHeatMap(heatDataSo22, layerSo22, jgSo22);
                                }
                                // O3 2
                                if (document.getElementById('O32').checked) {
                                    if (layerO32 == undefined) {
                                        layerO32 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgO32 = true;
                                    drawHeatMap(heatDataO32, layerO32, jgO32);
                                } else {
                                    if (layerO32 != undefined) {
                                        map.remove(layerO32);
                                        layerO32 = undefined;
                                    }
                                    jgO32 = false;
                                    drawHeatMap(heatDataO32, layerO32, jgO32);
                                }
                                // NO2 2
                                if (document.getElementById('NO22').checked) {
                                    if (layerNO22 == undefined) {
                                        layerNO22 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgNo22 = true;
                                    drawHeatMap(heatDataNo22, layerNO22, jgNo22);
                                } else {
                                    if (layerNO22 != undefined) {
                                        map.remove(layerNO22);
                                        layerNO22 = undefined;
                                    }
                                    jgNo22 = false;
                                    drawHeatMap(heatDataNo22, layerNO22, jgNo22);
                                }
                                // CO 2
                                if (document.getElementById('CO2').checked) {
                                    if (layerCO2 == undefined) {
                                        layerCO2 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgCo2 = true;
                                    drawHeatMap(heatDataCo2, layerCO2, jgCo2);
                                } else {
                                    if (layerCO2 != undefined) {
                                        map.remove(layerCO2);
                                        layerCO2 = undefined;
                                    }
                                    jgCo2 = false;
                                    drawHeatMap(heatDataCo2, layerCO2, jgCo2);
                                }
                                //PM2.5 2
                                if (document.getElementById('PM252').checked) {
                                    if (layerPM252 == undefined) {
                                        layerPM252 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgPM252 = true;
                                    drawHeatMap(heatDataPM252, layerPM252, jgPM252);
                                } else {
                                    if (layerPM252 != undefined) {
                                        map.remove(layerPM252);
                                        layerPM252 = undefined;
                                    }
                                    jgPM252 = false;
                                    drawHeatMap(heatDataPM252, layerPM252, jgPM252);
                                }
                                //PM10 2
                                if (document.getElementById('PM102').checked) {
                                    if (layerPM102 == undefined) {
                                        layerPM102 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgPM102 = true;
                                    drawHeatMap(heatDataPM102, layerPM102, jgPM102);
                                } else {
                                    if (layerPM102 != undefined) {
                                        map.remove(layerPM102);
                                        layerPM102 = undefined;
                                    }
                                    jgPM102 = false;
                                    drawHeatMap(heatDataPM102, layerPM102, jgPM102);
                                }
                            }
                        }
                    });
                }
                if (message.destinationName == topicList[2]) {
                    data3 = JSON.parse(message.payloadString);
                    if (data3.Temperature === undefined) {
                        document.getElementById("lng3").innerHTML = data3.Longitude.substr(0, data1.Longitude.indexOf('.') + 6) + ' °';
                        document.getElementById("lat3").innerHTML = data3.Latitude.substr(0, data1.Latitude.indexOf('.') + 6) + '°';
                        document.getElementById("height3").innerHTML = data3.Height + 'm';
                    } else {
                        document.getElementById("lng3").innerHTML = data3.Longitude.substr(0, data1.Longitude.indexOf('.') + 6) + ' °';
                        document.getElementById("lat3").innerHTML = data3.Latitude.substr(0, data1.Latitude.indexOf('.') + 6) + '°';
                        document.getElementById("height3").innerHTML = data3.Height + ' m';
                        document.getElementById("SO233").innerHTML = data3.So2.substr(0, data1.So2.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("O333").innerHTML = data3.O3.substr(0, data1.O3.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("NO233").innerHTML = data3.No2.substr(0, data1.No2.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("CO33").innerHTML = data3.Co.substr(0, data1.Co.indexOf('.') + 2) + 'mg/m³';
                        document.getElementById("PM2.533").innerHTML = data3.Pm2_5.substr(0, data1.Pm2_5.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("PM1033").innerHTML = data3.Pm10.substr(0, data1.Pm10.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("VOC33").innerHTML = data3.Voc + 'ppb';
                        document.getElementById("temperature33").innerHTML = data3.Temperature + '℃';
                        document.getElementById("humidity33").innerHTML = data3.Humidity + '%';
                    }
                    var gps = [data3.Longitude, data3.Latitude];
                    AMap.convertFrom(gps, 'gps', function (status, result) {
                        if (result.info === 'ok') {
                            lnglats3 = result.locations[0];
                            var icon = new AMap.Icon({
                                size: new AMap.Size(40, 40),
                                image: '../images/plane.png',
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(40, 40)
                            });
                            if (judgement3) {
                                marker3 = new AMap.Marker({
                                    position: new AMap.LngLat(lnglats3.lng, lnglats3.lat),
                                    anchor: 'center',
                                    offset: new AMap.Pixel(0, 0),
                                    icon: icon,
                                    angle: data3.YawAngle, //偏移量 
                                    autoRotation: true, //自动旋转  
                                    map: map
                                });
                                judgement3 = false;
                                map.add(marker3);
                            } else {
                                marker3.on('click', function () {
                                    // judgementAirplane3 = !judgementAirplane3;
                                    // document.getElementById("videoBox3").style.display = 'none';
                                    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(requestControl), 0, false)
                                });
                                //marker.setPosition(new AMap.LngLat(lnglats.lng,lnglats.lat));
                                datas3[0] = lnglats3.lng;
                                datas3[1] = lnglats3.lat;
                                dataArray3.push(datas3);
                                for (var i = 0; i < dataArray3.length; i++) {
                                    marker3.setPosition(new AMap.LngLat(dataArray3[i][0], dataArray3[i][1]));
                                    markerList3.push(marker3);
                                };
                                for (var i = 0; i < markerList3.length; i++) {
                                    path3.push(markerList3[i].getPosition());
                                }
                                polyline3 = new AMap.Polyline({
                                    path: path3,
                                    borderWeight: 2,
                                    strokeColor: 'red',
                                    lineJoin: 'round',
                                    map: map
                                });
                                var heatDatasSo2 = {
                                    lng: lnglats3.lng,
                                    lat: lnglats3.lat,
                                    count: parseInt(data3.So2)
                                };
                                var heatDatasO3 = {
                                    lng: lnglats3.lng,
                                    lat: lnglats3.lat,
                                    count: parseInt(data3.O3)
                                };
                                var heatDatasNo2 = {
                                    lng: lnglats3.lng,
                                    lat: lnglats3.lat,
                                    count: parseInt(data3.No2)
                                };
                                var heatDatasCo = {
                                    lng: lnglats3.lng,
                                    lat: lnglats3.lat,
                                    count: parseInt(data3.Co)
                                };
                                var heatDatasPM25 = {
                                    lng: lnglats3.lng,
                                    lat: lnglats3.lat,
                                    count: parseInt(data3.Pm2_5)
                                };
                                var heatDatasPM10 = {
                                    lng: lnglats3.lng,
                                    lat: lnglats3.lat,
                                    count: parseInt(data3.Pm10)
                                };
                                heatDataSo23.push(heatDatasSo2);
                                heatDataO33.push(heatDatasO3);
                                heatDataNo23.push(heatDatasNo2);
                                heatDataCo3.push(heatDatasCo);
                                heatDataPM253.push(heatDatasPM25);
                                heatDataPM103.push(heatDatasPM10);
                                //  SO2 3
                                if (document.getElementById('SO23').checked) {
                                    if (layerSo23 == undefined) {
                                        layerSo23 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgSo23 = true;
                                    drawHeatMap(heatDataSo23, layerSo23, jgSo23);
                                } else {
                                    if (layerSo23 != undefined) {
                                        map.remove(layerSo23);
                                        layerSo23 = undefined;
                                    }
                                    jgSo23 = false;
                                    drawHeatMap(heatDataSo23, layerSo23, jgSo23);
                                }
                                // O3 3
                                if (document.getElementById('O33').checked) {
                                    if (layerO33 == undefined) {
                                        layerO33 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgO33 = true;
                                    drawHeatMap(heatDataO33, layerO33, jgO33);
                                } else {
                                    if (layerO33 != undefined) {
                                        map.remove(layerO33);
                                        layerO33 = undefined;
                                    }
                                    jgO33 = false;
                                    drawHeatMap(heatDataO33, layerO33, jgO33);
                                }
                                // NO2 3
                                if (document.getElementById('NO23').checked) {
                                    if (layerNO23 == undefined) {
                                        layerNO23 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgNo23 = true;
                                    drawHeatMap(heatDataNo23, layerNO23, jgNo23);
                                } else {
                                    if (layerNO23 != undefined) {
                                        map.remove(layerNO23);
                                        layerNO23 = undefined;
                                    }
                                    jgNo23 = false;
                                    drawHeatMap(heatDataNo23, layerNO23, jgNo23);
                                }
                                // CO 3
                                if (document.getElementById('CO3').checked) {
                                    if (layerCO3 == undefined) {
                                        layerCO3 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgCo3 = true;
                                    drawHeatMap(heatDataCo3, layerCO3, jgCo3);
                                } else {
                                    if (layerCO3 != undefined) {
                                        map.remove(layerCO3);
                                        layerCO3 = undefined;
                                    }
                                    jgCo3 = false;
                                    drawHeatMap(heatDataCo3, layerCO3, jgCo3);
                                }
                                //PM2.5 3
                                if (document.getElementById('PM253').checked) {
                                    if (layerPM253 == undefined) {
                                        layerPM253 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgPM253 = true;
                                    drawHeatMap(heatDataPM253, layerPM253, jgPM253);
                                } else {
                                    if (layerPM253 != undefined) {
                                        map.remove(layerPM253);
                                        layerPM253 = undefined;
                                    }
                                    jgPM253 = false;
                                    drawHeatMap(heatDataPM253, layerPM253, jgPM253);
                                }
                                //PM10 3
                                if (document.getElementById('PM103').checked) {
                                    if (layerPM103 == undefined) {
                                        layerPM103 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgPM103 = true;
                                    drawHeatMap(heatDataPM103, layerPM103, jgPM103);
                                } else {
                                    if (layerPM103 != undefined) {
                                        map.remove(layerPM103);
                                        layerPM103 = undefined;
                                    }
                                    jgPM103 = false;
                                    drawHeatMap(heatDataPM103, layerPM103, jgPM103);
                                }
                            }
                        }

                    });
                }
                if (message.destinationName == topicList[3]) {
                    data4 = JSON.parse(message.payloadString);
                    if (data4.Temperature === undefined) {
                        document.getElementById("lng4").innerHTML = data4.Longitude.substr(0, data1.Longitude.indexOf('.') + 6) + ' °';
                        document.getElementById("lat4").innerHTML = data4.Latitude.substr(0, data1.Latitude.indexOf('.') + 6) + '°';
                        document.getElementById("height4").innerHTML = data4.Height + 'm';
                    } else {
                        document.getElementById("lng4").innerHTML = data4.Longitude.substr(0, data1.Longitude.indexOf('.') + 6) + ' °';
                        document.getElementById("lat4").innerHTML = data4.Latitude.substr(0, data1.Latitude.indexOf('.') + 6) + '°';
                        document.getElementById("height4").innerHTML = data4.Height + ' m';
                        document.getElementById("SO244").innerHTML = data4.So2.substr(0, data1.So2.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("O344").innerHTML = data4.O3.substr(0, data1.O3.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("NO244").innerHTML = data4.No2.substr(0, data1.No2.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("CO44").innerHTML = data4.Co.substr(0, data1.Co.indexOf('.') + 2) + 'mg/m³';
                        document.getElementById("PM2.544").innerHTML = data4.Pm2_5.substr(0, data1.Pm2_5.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("PM1044").innerHTML = data4.Pm10.substr(0, data1.Pm10.indexOf('.') + 2) + 'μg/m³';
                        document.getElementById("VOC44").innerHTML = data4.Voc + 'ppb';
                        document.getElementById("temperature44").innerHTML = data4.Temperature + '℃';
                        document.getElementById("humidity44").innerHTML = data4.Humidity + '%';
                    }
                    var gps = [data4.Longitude, data4.Latitude];
                    AMap.convertFrom(gps, 'gps', function (status, result) {
                        if (result.info === 'ok') {
                            lnglats4 = result.locations[0];
                            var icon = new AMap.Icon({
                                size: new AMap.Size(40, 40),
                                image: '../images/plane.png',
                                imageOffset: new AMap.Pixel(0, 0),
                                imageSize: new AMap.Size(40, 40)
                            });
                            if (judgement4) {
                                marker4 = new AMap.Marker({
                                    position: new AMap.LngLat(lnglats4.lng, lnglats4.lat),
                                    anchor: 'center',
                                    offset: new AMap.Pixel(0, 0),
                                    icon: icon,
                                    angle: data4.YawAngle, //偏移量 
                                    autoRotation: true, //自动旋转  
                                    map: map
                                });
                                judgement4 = false;
                                map.add(marker4);
                            } else {
                                marker4.on('click', function () {
                                    // judgementAirplane4 = !judgementAirplane4;
                                    // document.getElementById("videoBox4").style.display = 'none';
                                    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(requestControl), 0, false)
                                });
                                //marker.setPosition(new AMap.LngLat(lnglats.lng,lnglats.lat));
                                datas4[0] = lnglats4.lng;
                                datas4[1] = lnglats4.lat;
                                dataArray4.push(datas4);
                                for (var i = 0; i < dataArray4.length; i++) {
                                    marker4.setPosition(new AMap.LngLat(dataArray4[i][0], dataArray4[i][1]));
                                    markerList4.push(marker4);
                                };
                                for (var i = 0; i < markerList4.length; i++) {
                                    path4.push(markerList4[i].getPosition());
                                }
                                polyline4 = new AMap.Polyline({
                                    path: path4,
                                    borderWeight: 2,
                                    strokeColor: 'red',
                                    lineJoin: 'round',
                                    map: map
                                });
                                var heatDatasSo2 = {
                                    lng: lnglats4.lng,
                                    lat: lnglats4.lat,
                                    count: parseInt(data4.So2)
                                };
                                var heatDatasO3 = {
                                    lng: lnglats4.lng,
                                    lat: lnglats4.lat,
                                    count: parseInt(data4.O3)
                                };
                                var heatDatasNo2 = {
                                    lng: lnglats4.lng,
                                    lat: lnglats4.lat,
                                    count: parseInt(data4.No2)
                                };
                                var heatDatasCo = {
                                    lng: lnglats4.lng,
                                    lat: lnglats4.lat,
                                    count: parseInt(data4.Co)
                                };
                                var heatDatasPM25 = {
                                    lng: lnglats4.lng,
                                    lat: lnglats4.lat,
                                    count: parseInt(data4.Pm2_5)
                                };
                                var heatDatasPM10 = {
                                    lng: lnglats4.lng,
                                    lat: lnglats4.lat,
                                    count: parseInt(data4.Pm10)
                                };
                                heatDataSo24.push(heatDatasSo2);
                                heatDataO34.push(heatDatasO3);
                                heatDataNo24.push(heatDatasNo2);
                                heatDataCo4.push(heatDatasCo);
                                heatDataPM254.push(heatDatasPM25);
                                heatDataPM104.push(heatDatasPM10);
                                //  SO2 4
                                if (document.getElementById('SO24').checked) {
                                    if (layerSo24 == undefined) {
                                        layerSo24 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgSo24 = true;
                                    drawHeatMap(heatDataSo24, layerSo24, jgSo24);
                                } else {
                                    if (layerSo24 != undefined) {
                                        map.remove(layerSo24);
                                        layerSo24 = undefined;
                                    }
                                    jgSo24 = false;
                                    drawHeatMap(heatDataSo24, layerSo24, jgSo24);
                                }
                                // O3 4
                                if (document.getElementById('O34').checked) {
                                    if (layerO34 == undefined) {
                                        layerO34 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgO34 = true;
                                    drawHeatMap(heatDataO34, layerO34, jgO34);
                                } else {
                                    if (layerO34 != undefined) {
                                        map.remove(layerO34);
                                        layerO34 = undefined;
                                    }
                                    jgO34 = false;
                                    drawHeatMap(heatDataO34, layerO34, jgO34);
                                }
                                // NO2 4
                                if (document.getElementById('NO24').checked) {
                                    if (layerNO24 == undefined) {
                                        layerNO24 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgNo24 = true;
                                    drawHeatMap(heatDataNo24, layerNO24, jgNo24);
                                } else {
                                    if (layerNO24 != undefined) {
                                        map.remove(layerNO24);
                                        layerNO24 = undefined;
                                    }
                                    jgNo24 = false;
                                    drawHeatMap(heatDataNo24, layerNO24, jgNo24);
                                }
                                // CO 4
                                if (document.getElementById('CO4').checked) {
                                    if (layerCO4 == undefined) {
                                        layerCO4 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgCo4 = true;
                                    drawHeatMap(heatDataCo4, layerCO4, jgCo4);
                                } else {
                                    if (layerCO4 != undefined) {
                                        map.remove(layerCO4);
                                        layerCO4 = undefined;
                                    }
                                    jgCo4 = false;
                                    drawHeatMap(heatDataCo4, layerCO4, jgCo4);
                                }
                                //PM2.5 4
                                if (document.getElementById('PM254').checked) {
                                    if (layerPM254 == undefined) {
                                        layerPM254 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgPM254 = true;
                                    drawHeatMap(heatDataPM254, layerPM254, jgPM254);
                                } else {
                                    if (layerPM254 != undefined) {
                                        map.remove(layerPM254);
                                        layerPM254 = undefined;
                                    }
                                    jgPM254 = false;
                                    drawHeatMap(heatDataPM254, layerPM254, jgPM254);
                                }
                                //PM10 4
                                if (document.getElementById('PM104').checked) {
                                    if (layerPM104 == undefined) {
                                        layerPM104 = new Loca.GridLayer({
                                            map: map
                                        });
                                    }
                                    jgPM104 = true;
                                    drawHeatMap(heatDataPM104, layerPM104, jgPM104);
                                } else {
                                    if (layerPM104 != undefined) {
                                        map.remove(layerPM104);
                                        layerPM104 = undefined;
                                    }
                                    jgPM104 = false;
                                    drawHeatMap(heatDataPM104, layerPM104, jgPM104);
                                }
                            }
                        }
                    });
                }
            }
        };
        client.onMessageArrived = onMessageArrived;
        client.connect(options);
        timer = setInterval("clearData()", 2000);
    }
}


function followMap() {
    if (judgementMap) {
        timer = setInterval('map.setFitView(marker1)', 500);
        judgementMap = false;
    } else {
        map.setFitView();
        clearInterval(timer);
        judgementMap = true;
    }
};

function switchLayer() {
    if (judgementLayer) {
        var layers = [
            new AMap.TileLayer()
        ];
        judgementLayer = false;
        map.setLayers(layers);
    } else {
        var layers1 = [
            new AMap.TileLayer.Satellite()
        ];
        judgementLayer = true;
        map.setLayers(layers1);
    }
};

function clearData() {
    datas1 = [];
    datas2 = [];
    datas3 = [];
    datas4 = [];
    dataArray1 = [];
    dataArray2 = [];
    dataArray3 = [];
    dataArray4 = [];
    markerList1 = [];
    markerList2 = [];
    markerList3 = [];
    markerList4 = [];
    //清空path则少画一段线
    polyline1 = [];
    polyline2 = [];
    polyline3 = [];
    polyline4 = [];
    console.log(0);
};

function controlPolyline() {
    if (judgementPolyline) {
        judgementPolyline = false;

    } else {
        judgementPolyline = true;
    }
}

function heatMaps() {
    if (judgementHeatMap) {
        document.getElementById('heatMapControl').style.display = 'block';
        judgementHeatMap = false;
    } else {
        document.getElementById('heatMapControl').style.display = 'none';
        judgementHeatMap = true;
    }
};

// function heatMap() {
//     if (document.getElementsByName('SO21').checked) {
//         drawHeatMap(heatDataSo21, layerSo21);
//         console.log(1);
//     } else {
//         layerSo21.hide();
//     }
// }

function moreBig() {
    map.zoomIn();
};

function moreSmall() {
    map.zoomOut();
};

function userInfoList() {
    if (judgementUserInfo) {
        document.getElementById("deviceInfo").style.display = "table";
        document.getElementById("list").innerHTML = "&#xe658;"
        judgementUserInfo = false;
    } else {
        document.getElementById("deviceInfo").style.display = "none";
        document.getElementById("list").innerHTML = "&#xe659;"
        judgementUserInfo = true;
    }
}

function airDataBox1() {
    if (judgementAirDataBox1) {
        document.getElementById("airData1").style.display = "block";
        document.getElementById("airDataBox1").style.display = "none";
        judgementAirDataBox1 = false;
    } else {
        document.getElementById("airData1").style.display = "none";
        document.getElementById("airDataBox1").style.display = "block";
        judgementAirDataBox1 = true;
    }
}

function airDataBox2() {
    if (judgementAirDataBox2) {
        document.getElementById("airData2").style.display = "block";
        document.getElementById("airDataBox2").style.display = "none";
        judgementAirDataBox2 = false;
    } else {
        document.getElementById("airData2").style.display = "none";
        document.getElementById("airDataBox2").style.display = "block";
        judgementAirDataBox2 = true;
    }
}

function airDataBox3() {
    if (judgementAirDataBox3) {
        document.getElementById("airData3").style.display = "block";
        document.getElementById("airDataBox3").style.display = "none";
        judgementAirDataBox3 = false;
    } else {
        document.getElementById("airData3").style.display = "none";
        document.getElementById("airDataBox3").style.display = "block";
        judgementAirDataBox3 = true;
    }
}

function airDataBox4() {
    if (judgementAirDataBox4) {
        document.getElementById("airData4").style.display = "block";
        document.getElementById("airDataBox4").style.display = "none";
        judgementAirDataBox4 = false;
    } else {
        document.getElementById("airData4").style.display = "none";
        document.getElementById("airDataBox4").style.display = "block";
        judgementAirDataBox4 = true;
    }
}

function drawHeatMap(heatData, layer, jg) {
    if (jg) {
        layer.setData(heatData, {
            lnglat: function (obj) {
                var val = obj.value;
                return [val['lng'], val['lat']]
            },
            value: 'count',
        });
        layer.setOptions({
            unit: 'px',
            mode: 'sum',
            style: {
                color: ['#008000', '#00FF00', '#ADFF2F', '#FFFF00', '#FFD700', '#FFA500', '#FF0000'],
                radius: 17,
                opacity: 0.9,
                gap: 2,
                height: [0, 0],
                text: {
                    content: function (v) {
                        return v.value.sum;
                    },
                    direction: 'center', // 文字方位
                    //offset: [2, -5],  // 偏移大小
                    fontSize: 12, // 文字大小
                    fillColor: '#03101F',
                    strokeColor: 'rgba(255,255,255,0)', // 文字描边颜色
                    strokeWidth: 0, // 文字描边宽度 
                }
            }
        });
        layer.render();
    } else {

        if (layer == undefined && jg == false) {

            //layer.setMap(null);
            //map.remove(layer);
        }
    }
};
// 显示飞行数据
function flyData() {
    if (!judgementFlyOrDrive) {
        document.getElementById("airplaneDrive").style.display = 'none';
        document.getElementById("airplane").style.display = 'block';
        judgementFlyOrDrive = true;
    }
}
// 显示操作界面
function flyDrive() {
    if (judgementFlyOrDrive) {
        document.getElementById("airplane").style.display = 'none';
        document.getElementById("airplaneDrive").style.display = 'block';
        document.getElementById("planeControl1").innerText = document.getElementById("plane1").innerText;
        document.getElementById("planeControl2").innerText = document.getElementById("plane2").innerText;
        document.getElementById("planeControl3").innerText = document.getElementById("plane3").innerText;
        document.getElementById("planeControl4").innerText = document.getElementById("plane4").innerText;
        judgementFlyOrDrive = false;
    }
}

function requestControl1() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(requestControl), 0, false)
}

function takeOff1() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(takeOff), 0, false)
}

function land1() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(land), 0, false)
}

function goHome1() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(goHome), 0, false)
}

function moveTop1() {
    // var message = new Paho.MQTT.Message(JSON.stringify(moveTop));
    // message.destinationName = 'qx/em/device/1/clientSub/' + deviceEmailPlus[0];
    // client.send(message);
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(moveTop), 0, false)
}

function moveBottom1() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(moveBottom), 0, false)
}

function moveLeft1() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(moveLeft), 0, false)
}

function moveRight1() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(moveRight), 0, false)
}

function turnLeft1() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(turnLeft), 0, false)
}

function turnRight1() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(turnRight), 0, false)
}

function turnUp1() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(turnUp), 0, false)
}

function turnDown1() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[0], JSON.stringify(turnDown), 0, false)
}





function requestControl2() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(requestControl), 0, false)
}

function takeOff2() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(takeOff), 0, false)
}

function land2() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(land), 0, false)
}

function goHome2() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(goHome), 0, false)
}

function moveTop2() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(moveTop), 0, false)
}

function moveBottom2() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(moveBottom), 0, false)
}

function moveLeft2() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(moveLeft), 0, false)
}

function moveRight2() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(moveRight), 0, false)
}

function turnLeft2() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(turnLeft), 0, false)
}

function turnRight2() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(turnRight), 0, false)
}

function turnUp2() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(turnUp), 0, false)
}

function turnDown2() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[1], JSON.stringify(turnDown), 0, false)
}






function requestControl3() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(requestControl), 0, false)
}

function takeOff3() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(takeOff), 0, false)
}

function land3() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(land), 0, false)
}

function goHome3() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(goHome), 0, false)
}

function moveTop3() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(moveTop), 0, false)
}

function moveBottom3() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(moveBottom), 0, false)
}

function moveLeft3() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(moveLeft), 0, false)
}

function moveRight3() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(moveRight), 0, false)
}

function turnLeft3() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(turnLeft), 0, false)
}

function turnRight3() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(turnRight), 0, false)
}

function turnUp3() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(turnUp), 0, false)
}

function turnDown3() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[2], JSON.stringify(turnDown), 0, false)
}





function requestControl4() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(requestControl), 0, false)
}

function takeOff4() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(takeOff), 0, false)
}

function land4() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(land), 0, false)
}

function goHome4() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(goHome), 0, false)
}

function moveTop4() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(moveTop), 0, false)
}

function moveBottom4() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(moveBottom), 0, false)
}

function moveLeft4() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(moveLeft), 0, false)
}

function moveRight4() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(moveRight), 0, false)
}

function turnLeft4() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(turnLeft), 0, false)
}

function turnRight4() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(turnRight), 0, false)
}

function turnUp4() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(turnUp), 0, false)
}

function turnDown4() {
    client.publish('qx/em/device/1/clientSub/' + deviceEmailPlus[3], JSON.stringify(turnDown), 0, false)
}