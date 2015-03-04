'use strict';
angular.module("textAngularTest").controller('wysiwygeditor', function($scope, textAngularManager, $document) {
    $scope.data = {orightml: '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><img class="ta-insert-video" ta-insert-video="https://www.youtube.com/embed/2maA1-mvicY" src="https://img.youtube.com/vi/2maA1-mvicY/hqdefault.jpg" allowfullscreen="true" width="300" frameborder="0" height="250"/></p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p><p>昮朐 魡 燚璒瘭 譾躒鑅, 皾籈譧 紵脭脧 逯郹酟 煃 瑐瑍, 踆跾踄 趡趛踠 顣飁 廞 熥獘 豥 蔰蝯蝺 廦廥彋 蕍蕧螛 溹溦 幨懅憴 妎岓岕 緁, 滍 蘹蠮 蟷蠉蟼 鱐鱍鱕, 阰刲 鞮鞢騉 烳牼翐 魡 骱 銇韎餀 媓幁惁 嵉愊惵 蛶觢, 犝獫 嶵嶯幯 縓罃蔾 魵 踄 罃蔾 獿譿躐 峷敊浭, 媓幁 黐曮禷 椵楘溍 輗 漀 摲摓 墐墆墏 捃挸栚 蛣袹跜, 岓岕 溿 斶檎檦 匢奾灱 逜郰傃</p>'};
    $scope.data.htmlcontent = $scope.data.orightml;
    $scope.data.htmlcontent3;
    $scope.$watch('data.htmlcontent3', function(val){console.log(val);});
    $scope.disabled = false;
    $scope.canEdit = true;
    $scope.changetesth1 = function(){
      textAngularManager.updateToolbarToolDisplay('test', 'h1', {buttontext: 'Heading 1'});
    };
    $scope.changeallh2 = function(){
      textAngularManager.updateToolDisplay('h2', {buttontext: 'Heading 2'});
    };
    $scope.changeallh = function(){
      var data = {};
      for(var i = 1; i < 7; i++){
        data['h' + i] = {buttontext: 'Heading ' + i};
      }
      textAngularManager.updateToolsDisplay(data);
    };
    $scope.resettoolbar = function(){
      textAngularManager.resetToolsDisplay();
    };
    $scope.iconsallh = function(){
      var data = {};
      for(var i = 1; i < 7; i++){
        data['h' + i] = {
          iconclass: 'fa fa-flag',
          buttontext: i
        };
      }
      textAngularManager.updateToolsDisplay(data);
    };
    $scope.clear = function(){
      $scope.data = {orightml: '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>'};
    };
    $scope.testPaste = function($html){
      console.log('Hit Paste', arguments);
      return '<p>Jackpot</p>';
    };
});
