define("excelUploader", ["avalon", "uploader", "bsAlert", "jquery"], function(avalon, uploader, bsAlert, $){
    avalon.component("ms:exceluploader", {
        $template: '<div class="col-md-12">' +
        '<br/>' +
        '<div class="form-group">' +
        '<div id="excelFileSelector">选择文件</div>' +
        '<p>上传进度<span ms-text="uploadProgress"></span>%</p>' +
        '</div> ' +
        '<table class="table table-striped" ms-visible="uploaded"> ' +
        '<tr> <td>编号</td> <td>用户名</td> <td>真实姓名</td> <td>邮箱</td> <td>密码</td> <td>学号</td> </tr> ' +
        '<tr ms-repeat="excelList"> ' +
        '<td>{{ $index + 1 }}</td> ' +
        '<td>{{ el.username }}</td> ' +
        '<td>{{ el.real_name }}</td> ' +
        '<td>{{ el.email }}</td> ' +
        '<td>{{ el.password }}</td> ' +
        '<td>{{ el.student_id }}</td> </tr> ' +
        '</table> ' +
        '</div>',
        excelList: [],
        uploaded: false,
        uploadProgress: 0,

        $ready: function(vm, el){
            el.msRetain = true;
            var excelUploader = uploader("#excelFileSelector", "/api/admin/multi_add_user/",
                {title: 'userinfo xls', extensions: 'xls', mimeTypes: 'application/x-xls'},
                function (file, response) {
                    if(response.code){
                        bsAlert(response.data);
                    }else{
                        vm.excelList = [];
                        vm.uploaded = true;
                        for(var key in response.data.excel_list){
                            alert(response.data.excel_list[key].username);
                            vm.excelList.push({
                                username: response.data.excel_list[key].username,
                                real_name: response.data.excel_list[key].real_name,
                                email: response.data.excel_list[key].email,
                                password: response.data.excel_list[key].password,
                                student_id: response.data.excel_list[key].student_id
                            })
                        }
                        bsAlert("导入成功");
                    }
                },
                function (file, percentage) {
                    vm.uploadProgress = parseInt(percentage * 100);
                });
        }
    })
});