angular.module('app',[])
    .filter('cityFilter',function () {
        return function (data,parent) {
           var filterData=[];
           angular.forEach(data,function (obj) {
               if(obj.parent===parent){
                   filterData.push(obj);
               }
           })
            return filterData;
        }
    })
    .directive('customTextArea',function () {
        return {
            restrict:'E',
            template:'<div contenteditable="true"></div>',
            replace:true,
            require:'ngModel',
            link:function (scople,elm,attrs,ngModelController) {
                //view到model的处理
                elm.on('keyup',function () {
                    ngModelController.$setViewValue(elm.html());
                    console.log(ngModelController);
                })
            }
        }
    })
.controller('myCtrl',function ($scope) {
    $scope.hobbies=[{
            id:1,
            name:'玩游戏'
        },
        {
            id:2,
            name:'看书'
        },
        {
            id: 3,
            name: '打篮球'
        },
        {
            id: 4,
            name: '睡觉'
        }]

    var that=this;
    $scope.cities = [
        {
            name: '上海',
            parent: 0,
            id: 1
        },
        {
            name: '上海市',
            parent: 1,
            id: 2
        },
        {
            name: '徐汇区',
            parent: 2,
            id: 8
        },
        {
            name: '长宁区',
            parent: 2,
            id: 3
        },
        {
            name: '北京',
            parent: 0,
            id: 4
        },
        {
            name: '北京市',
            parent: 4,
            id: 5
        },
        {
            name: '东城区',
            parent: 5,
            id: 6
        },
        {
            name: '丰台区',
            parent: 5,
            id: 7
        },
        {
            name: '浙江',
            parent: 0,
            id: 9
        },
        {
            name: '杭州',
            parent: 9,
            id: 100
        },
        {
            name: '宁波',
            parent: 9,
            id: 11
        },
        {
            name: '西湖区',
            parent: 100,
            id: 12
        },
        {
            name: '北仑区‎',
            parent: 11,
            id: 13
        }
    ];
    //一般像爱好会有个默认值，写在scope的data里，默认数据，可能是从后台过来的
    $scope.data={
        hobbies:[1,2],
        area:13
    }
    //先保留一份默认值
    $scope.originData=angular.copy($scope.data);
    $scope.reset=function () {
        $scope.data=angular.copy($scope.originData);
        that.initCity();
        $scope.myForm.$setPristine();
    }
    //让城市关联使用
    this.findId=function (parent) {
        var parentId;
        angular.forEach($scope.cities,function (o) {
            if(o.id===parent){
                parentId=o.parent;
                return;
            }
        })
        return parentId;
    }


    this.initCity=function () {
        if($scope.data.area!==undefined){
            $scope.data.city=this.findId($scope.data.area);
            $scope.data.province=this.findId($scope.data.city);
        }
    }

    // 第一次打开页面 需要初始化一下
    this.initCity.call(this);

    $scope.toggleSelection=function (id) {
        var index=-1;
        if($scope.data.hobbies===undefined){
            $scope.data.hobbies=[];
        }else{
            index=$scope.data.hobbies.indexOf(id);
        }

        if(index===-1){
            $scope.data.hobbies.push(id);
        }else {
            $scope.data.hobbies.splice(index,1)
        }
        console.log($scope.data.hobbies)
    }
})