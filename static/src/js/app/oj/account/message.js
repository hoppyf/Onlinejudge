require(["jquery", "bsAlert", "csrfToken", "validator"], function ($, bsAlert, csrfTokenHeader) {
    $('form').validator().on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var content = $("#message_info").val();
            var leave_to = $("#leave_to_who").text();
            content = $.trim(content);
            if (content.length == 0) {
                bsAlert("留言内容不能为空");
                return false;
            }

            $.ajax({
                beforeSend: csrfTokenHeader,
                url: "/api/leave_message/",
                data: {content: content, leave_to: leave_to},
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