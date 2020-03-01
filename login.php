<?php
    header('Content-Type:text/html;Charset=utf-8');
    $dbHost="rm-2ze11ag9r326zljjlwo.mysql.rds.aliyuncs.com";
    $dbUser="account";
    $dbPasswd="qixue123!";
    $dbName="user_db";
    $dbDeviceName="em_accountproduct";
    $dbSetChar="utf8";
    $conn=mysqli_connect($dbHost,$dbUser,$dbPasswd);
    mysqli_select_db($conn,$dbName);
    mysqli_set_charset($conn,$dbSetChar);
    $phone=$_POST['phone'];
    $password=$_POST['password'];
    $sql="SELECT * FROM `account` WHERE phone='$phone' and password='$password'";
    session_start();
    $result=mysqli_query($conn,$sql);
    $arr=mysqli_fetch_assoc($result);
    $data=$arr;
    $_SESSION['id']=$arr["id"];
    $_SESSION['name']=$arr["name"];
    $_SESSION['telephone']=$arr["phone"];
    $_SESSION['email']=$arr["email"];
    $_SESSION['client_pwd']=$arr["client_pwd"];
    $topicString = $_POST["topicString"];
    $dataArr = [];
    $dataArr = explode("/",$topicString);
    // $deviceAccount = str_replace("qqcom","@qq.com",$dataArr[4]);
    $deviceAccount = $dataArr[5];
    $sql1="SELECT * FROM `em_accountproduct` WHERE dji_email='$deviceAccount'";
    $result1=mysqli_query($conn,$sql1);
    $arr1=mysqli_fetch_assoc($result1);
    $_SESSION['deviceAccount'] =$deviceAccount;
    $_SESSION['username']=$arr1['name'];
    $_SESSION['phone']=$arr1['phone'];
    $_SESSION['useraccount']=$arr1['dji_email'];
    if($arr) {
        echo "<script>alert('登录成功');location='index.html'</script>";
    }
    else {
        // var_dump($deviceAccount);
        echo $deviceAccount;
        echo "<script>alert('用户名或密码错误');location='login.html'</script>";
    }
?>