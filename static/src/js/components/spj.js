define("spj", ["avalon", "bsAlert"], function (avalon, bsAlert) {
    avalon.component("ms:spj", {
        $template: '<div class="col-md-6">' +
        ' ' +
        '<div class="form-group">' +
        '<label class="text">' +
        ' ' +
        ' ' +
        '</label></div></div>' +
        '<div class="col-md-6" ms-if="spj">' +
        '<label>SPJ代码语言</label>' +
        '<div class="form-group">' +
        '<label class="text">' +
        '<input type="radio" name="spjLanguage" value="1" ms-duplex-string="spjLanguage"> C ' +
        '<input type="radio" name="spjLanguage" value="2" ms-duplex-string="spjLanguage"> C++' +
        '</label>' +
        '</div>' +
        '</div>' +
        '<div class="col-md-12" ms-if="spj">' +
        '<label>SPJ代码</label>' +
        '<textarea class="form-control" rows="5" ms-duplex="spjCode"></textarea>' +
        '</div>',
        spj: false,
        spjLanguage: 1,
        spjCode: "",
        checkboxDisabled: false,
        $init: function(vm, el) {
            vm.$watch("testCaseUploadFinished", function (spj) {
                vm.spj = spj;
                vm.checkboxDisabled = true;
            });
        },
        $ready: function (vm, el) {
            el.msRetain = true;

        }
    })
});
