require(["jquery", "bsAlert", "csrfToken", "validator"], function ($, bsAlert, csrfTokenHeader) {
    $('form').validator().on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var real_name = $.trim($("#real_name").val());
            var email = $("#email").val();
            var phone = $("#phone").val();
            var hduoj_username = $("#hduoj_username").val();
            var bestcoder_username = $("#bestcoder_username").val();
            var codeforces_username = $("#codeforces_username").val();
            var blog = $("#blog").val();
            var mood = $("#mood").val();
            var school = $("#school").val();
            var student_id = $("#student_id").val();
            if(real_name.length==0){
                bsAlert("请输入真实姓名");
                return false;
            }
            if(phone && phone.length!=11){
                bsAlert("请输入正确的手机号");
                return false;
            }
            $.ajax({
                beforeSend: csrfTokenHeader,
                url: "/api/account/userprofile/",
                data: {
                    real_name: real_name,
                    email: email,
                    phone_number: phone,
                    hduoj_username: hduoj_username,
                    bestcoder_username: bestcoder_username,
                    codeforces_username: codeforces_username,
                    blog: blog,
                    mood: mood,
                    school: school,
                    student_id: student_id
                },
                dataType: "json",
                method: "put",
                success: function (data) {
                    if (!data.code) {
                        bsAlert("修改成功");
                    }
                    else{
                        bsAlert(data.data);
                    }
                },
                error: function () {
                    bsAlert("额 好像出错了，请刷新页面重试。")
                }

            });
            return false;
        }
    });
});

