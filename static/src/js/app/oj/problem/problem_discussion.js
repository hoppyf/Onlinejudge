require(["jquery", "bsAlert", "csrfToken", "validator"], function ($, bsAlert, csrfTokenHeader) {
    $('form').validator().on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var message = $("#discussion_message").val();
            message = $.trim(message);
            var problem_id = $("#hidden").val();
            if (message.length == 0) {
                bsAlert("内容不能为空");
                return false;
            }

            $.ajax({
                beforeSend: csrfTokenHeader,
                url: "/api/discussion/",
                data: {message: message, problem_id: problem_id},
                dataType: "json",
                method: "post",
                success: function (data) {
                    if (!data.code) {
                        bsAlert(data.data);
                        setTimeout(function () {
                            location.href = "";
                        }, 1500);
                    } else {
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