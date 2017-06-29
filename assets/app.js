var App = App || {};

App = {
  api: {
    root: 'http://hal.wire-frames.net/api/',
    key: 'cnc15c61f70694',
    api_name: 'StockSearch',
  },

  models: {},

  init: function() {
    var that = this;

    // 位置情報データ
    var locations = {
      'tokyo-station': {
        lat: 35.681298,
        lng: 139.7640529,
      },
      'osaka-station': {
        lat: 34.7024854,
        lng: 135.4937566,
      },
      'kyoto-station': {
        lat: 34.985849,
        lng: 135.7587667,
      },
    };

    // 初期表示のlocationを指定
    var init_location = locations['tokyo-station'];

    // Ajaxでじゃらんのデータを取得する
    $.get(this.api.root, {
      key: this.api.key,
      api_name: this.api.api_name,
      condition: {
        s_area: 137412,
        stay_date: '20170810',
        stay_count: 3,
        adult_num: 2,
        count: 10,
      },
    }).done(function(resp) {
      that.models.xml = resp;
      // レンダリングを実行する
      that.render();
    });

    // 日付指定
    $('.datepicker').pickadate({
      format: 'yyyymmdd',
    });

    // セレクトボタン
    $('select').material_select();

    var map = new google.maps.Map(document.getElementById('map'), {
      center: init_location,
      zoom: 14,
    });
  },

  render: function() {
    var xml = this.models.xml;

    var $plans = $(xml).find('Plan');

    console.log($plans);

    var $elem = $('#results-wrap');

    $elem.empty();

    var view = '';

    $plans.each(function() {
      var $plan = $(this);
      console.log($plan.find('PlanName').text());
      view += '<div class="card">';
      view += '<div class="row">';

      view += '<div class="col s3 image">';

      view +=
          '<img src="' +
          $plan.find('PlanPictureURL').text() +
          '" class="responsive-image" />';

      view += '</div>';

      view += '<div class="col s9 content">';

      view += '<ul>';
      view +=
          '<li class="left"><i class="material-icons left">business</i>' +
          $plan.find('HotelName').text() +
          '</li>';
      view +=
          '<li class="left"><i class="material-icons left">payment</i>' +
          $plan.find('SampleRate').text() +
          '円〜</li>';
      view += '</ul>';

      view += '<p class="clearfix">' + $plan.find('PlanName').text() + '</p>';

      view +=
          '<a target="_blank" href="' +
          $plan.find('PlanDetailURL').text() +
          '" class="btn btn-block blue">プランの詳細を見る</a>';

      view += '</div>';

      view += '</div>';
      view += '</div>';
    });

    $elem.append(view);
  },
};

// 実行
App.init();
