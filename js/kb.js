$(function () {
  setTimeout(() => {
    plot();
  }, 100);

  //渲染函数 时钟 图表
  function plot() {
    clock();
    echarts_useArea(831548.7, 601514.5);
    echarts_customer(1208, 238);
    echarts_rentArea();
    echarts_selfArea();
    echarts_accessMana();
    echarts_storge();
  }

  //数据分组
  function group(array, subNum) {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, index += subNum));
    }
    return newArray;
  }

  //时钟
  function clock() {
    // clock
    var t = setTimeout(time, 1000);//開始运行
    function time() {
      clearTimeout(t);//清除定时器
      dt = new Date();
      var y = dt.getFullYear();
      var MM = dt.getMonth() + 1;
      var DD = dt.getDate();
      var hh = dt.getHours();//获取时
      var mm = dt.getMinutes();//获取分
      var ss = dt.getSeconds();//获取秒
      if (MM < 10) MM = '0' + MM;
      if (DD < 10) DD = '0' + DD;
      if (hh < 10) hh = '0' + hh;
      if (mm < 10) mm = '0' + mm;
      if (ss < 10) ss = '0' + ss;
      document.getElementById("showData").innerHTML = y + "-" + MM + "-" + DD;
      document.getElementById("showTime").innerHTML = hh + ":" + mm + ":" + ss;
      t = setTimeout(time, 1000); //设定定时器，循环运行
    }
  }

  //仓库整体使用情况
  function echarts_useArea(iStorage_used, iStorage_unused) {
    var myChart = echarts.init(document.getElementById('echarts_useArea'));
    var scale = 1;
    var echartData = [{
      value: iStorage_used,
      name: '已使用面积'
    }, {
      value: iStorage_unused,
      name: '未使用面积'
    }]
    var rich = {
      yellow: {
        color: "#ffc72b",
        fontSize: 15 * scale,
        padding: [5, 4],
        align: 'center'
      },
      total: {
        color: "#ffc72b",
        fontSize: 20 * scale,
        align: 'center'
      },
      white: {
        color: "#fff",
        align: 'center',
        fontSize: 14 * scale,
        padding: [21, 0]
      },
      blue: {
        color: '#49dff0',
        fontSize: 12 * scale,
        align: 'center'
      },
      hr: {
        borderColor: '#0b5263',
        width: '100%',
        borderWidth: 1,
        height: 0,
      }
    }
    option = {
      // backgroundColor: '#031f2d',
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        position: function (p) {   //其中p为当前鼠标的位置
          return [p[0] + 10, p[1] - 10];
        }
      },
      title: {
        text: '总面积㎡',
        left: 'center',
        top: '53%',
        padding: [24, 0],
        textStyle: {
          color: '#fff',
          fontSize: 14 * scale,
          align: 'center'
        }
      },
      legend: {
        selectedMode: false,
        formatter: function (name) {
          var total = 0.0;
          echartData.forEach(function (value, index, array) {
            total += value.value;
          });
          total = total.toFixed(2)
          return '{total|' + total + '}';
        },
        data: [echartData[0].name],
        left: 'center',
        top: 'center',
        icon: 'none',
        align: 'center',
        textStyle: {
          color: "#fff",
          fontSize: 10 * scale,
          rich: rich
        },
      },
      series: [{
        name: '仓库整体使用情况',
        type: 'pie',
        radius: ['70%', '90%'],
        hoverAnimation: false,
        color: ['#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
        label: {
          normal: {
            formatter: function (params, ticket, callback) {
              var total = 0;
              var percent = 0;
              echartData.forEach(function (value, index, array) {
                total += value.value;
              });
              percent = ((params.value / total) * 100).toFixed(1);
              return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
            },
            rich: rich
          },
        },
        labelLine: {
          normal: {
            length: 35 * scale,
            length2: 0,
            lineStyle: {
              color: '#0b5263'
            }
          }
        },
        data: echartData
      }]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  //客户统计情况
  function echarts_customer(rent, self) {
    document.getElementById("rent").innerText = rent;
    document.getElementById("self").innerText = self;
    // 饼图中直接展现备注
    var rich = {
      white: {
        color: '#fff',
        align: 'center',
        fontWeight: 'bold',
        padding: [3, 0]
      }
    };

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart_customer'));
    var scaleData = [
      {
        'name': '租赁客户',
        'value': rent
      },
      {
        'name': '自营客户',
        'value': self
      },
    ];

    var placeHolderStyle = {
      normal: {
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        color: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0
      }
    };
    var data = [];
    var color1 = ['rgb(61, 186, 45)', 'rgb(255,222,0)', 'rgb(255,0,0)'];

    for (var i = 0; i < scaleData.length; i++) {
      data.push({
        value: scaleData[i].value,
        name: scaleData[i].name,
        itemStyle: {
          normal: {
            borderWidth: 4,
            shadowBlur: 30,
            borderColor: color1[i],
            shadowColor: color1[i],
            color: color1[i],
            opacity: 0.75,
          }
        }
      }, {
        value: 2,
        name: '',
        itemStyle: placeHolderStyle
      });
    }
    var seriesObj = [{
      name: '',
      type: 'pie',
      clockWise: false,
      radius: [50, 80],
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: 'inner',
            fontWeight: 'bold',
            formatter: function (params) {
              var percent = 0;
              var total = 0;
              for (var i = 0; i < scaleData.length; i++) {
                total += scaleData[i].value;
              }
              percent = ((params.value / total) * 100).toFixed(1);
              if (params.name !== '') {
                return params.name + '\n{white|' + '占比' + percent + '%}';
              } else {
                return '';
              }
            },
            rich: rich
          },
          labelLine: {
            show: false,
          },
        }
      },
      data: data
    }];
    option = {
      // backgroundColor: '#04243E',
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        position: function (p) {   //其中p为当前鼠标的位置
          return [p[0] + 10, p[1] - 10];
        }
      },
      legend: {
        show: false
      },
      toolbox: {
        show: false
      },
      series: seriesObj
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  //租赁客户仓库使用统计情况
  function echarts_rentArea() {
    rent_name = [
      "Toyota",
      "Honda",
      "Ford",
      "Chevrolet",
      "Volkswagen",
      "BMW",
      "Mercedes-Benz",
      "Audi",
      "Nissan",
      "Hyundai",
      "Kia",
      "Volvo",
      "Subaru"
    ];
    rent_area = [
      188939.0,
      106992.0,
      99002.0,
      44064.0,
      5966.0,
      5400.0,
      2093.0,
      7543.0,
      4984.0,
      7834.0,
      9346.0,
      17702.0,
      3771.5
    ];
    if (rent_area.length > 100) {
      // 将数据分成10组，多余的个体将被合并
      var split_index = rent_area.length / 10;
      group_rent_name = group(rent_name, split_index);
      group_rent_area = group(rent_area, split_index);
      if (rent_area.length % 10 !== 0) {
        group_rent_name[9].push.apply(group_rent_name[9], group_rent_name[10]);
        group_rent_area[9].push.apply(group_rent_area[9], group_rent_area[10]);
      }
    }
    else {
      // 数据量小时10个一组
      group_rent_name = group(rent_name, 10);
      group_rent_area = group(rent_area, 10);
    }
    var timeline_axis = [];
    var index = 0;
    for (index = 0; index < group_rent_area.length; index++) {
      timeline_axis[index] = (index + 1).toString();
    }
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart_rent'));

    option = {
      baseOption: {
        timeline: {
          y: '88%',
          axisType: 'category',
          autoPlay: true,
          playInterval: 1500,
          height: '10',
          data: timeline_axis,
        },
        tooltip: {},

        calculable: true,
        grid: {
          left: '0%',
          top: '10px',
          right: '0%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: "租赁客户名称",
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
              },
            },

            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              show: true,
              splitNumber: 15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '6',
              },
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '人数',
            axisLabel: {//y轴文字的配置
              textStyle: {
                color: "#fff",
                margin: 15
              },
              formatter: '{value} ㎡'//y轴的每一个刻度值后面加上单位
            },
          }
        ],
        series: [
          {
            name: '使用面积(㎡)',
            type: 'bar',
            barWidth: '50%', //柱子宽度
            barGap: 2, //柱子之间间距
          },
        ]
      },
      options: [
        {
          xAxis: [
            {
              data: group_rent_name[0],
            }
          ],
          series: [
            {
              data: group_rent_area[0],
              itemStyle: {
                normal: {
                  color: "#A5DEE4"
                }
              },
            },
          ]
        },
        {

          xAxis: [
            {
              data: group_rent_name[1],
            }
          ],
          series: [
            {
              data: group_rent_area[1],
              itemStyle: {
                normal: {
                  color: "#81C7D4"
                }
              },
            },
          ]
        },
        {
          xAxis: [
            {
              data: group_rent_name[2],
            }
          ],
          series: [
            {
              data: group_rent_area[2],
              itemStyle: {
                normal: {
                  color: "#24936E"
                }
              },
            },
          ]
        },
        {
          xAxis: [
            {
              data: group_rent_name[3],
            }
          ],
          series: [{
            data: group_rent_area[3], itemStyle: {
              normal: {
                color: "#5DAC81"
              }
            },
          },]
        },
        {
          xAxis: [
            {
              data: group_rent_name[4],
            }
          ],
          series: [{
            data: group_rent_area[4], itemStyle: {
              normal: {
                color: "#A8D8B9"
              }
            },
          },]
        },
        {
          xAxis: [
            {
              data: group_rent_name[5],
            }
          ],
          series: [{
            data: group_rent_area[5], itemStyle: {
              normal: {
                color: "#F596AA"
              }
            },
          },]
        },
        {
          xAxis: [
            {
              data: group_rent_name[6],
            }
          ],
          series: [{
            data: group_rent_area[6], itemStyle: {
              normal: {
                color: "#E87A90"
              }
            },
          },]
        },
        {
          xAxis: [
            {
              data: group_rent_name[7],
            }
          ],
          series: [{
            data: group_rent_area[7], itemStyle: {
              normal: {
                color: "#F4A7B9"
              }
            },
          },]
        },
        {
          xAxis: [
            {
              data: group_rent_name[8],
            }
          ],
          series: [{
            data: group_rent_area[8], itemStyle: {
              normal: {
                color: "#DB8E71"
              }
            },
          },]
        },
        {
          xAxis: [
            {
              'data': group_rent_name[9],
            }
          ],
          series: [{
            data: group_rent_area[9], itemStyle: {
              normal: {
                color: "#FB9966"
              }
            },
          },]
        },
      ]
    };

    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  //自营客户仓库使用统计情况
  function echarts_selfArea() {
    self_name =[
      "耐克",
      "阿迪达斯",
      "亚马逊",
      "苹果",
      "谷歌",
      "微软",
      "宝马",
      "奔驰",
      "路虎",
      "奥迪",
      "佳能",
      "尼康",
      "索尼",
      "雷克萨斯",
      "三星",
      "联想",
      "戴尔",
      "聚美优品",
      "美团",
      "饿了么",
      "京东",
      "雀巢",
      "可口可乐",
      "施华洛世奇",
      "耐克",
      "阿迪达斯",
      "华为",
      "小米",
      "亚马逊",
      "魅族",
      "星巴克",
      "麦当劳",
      "可爱多",
      "宜家",
      "宾得",
      "雪佛龙",
      "宝洁",
      "联合利华",
      "百事可乐",
      "可口可乐",
      "斯凯奇",
      "万宝路",
      "百度",
      "腾讯",
      "美国运通",
      "高露洁",
      "惠普",
      "华为",
      "诺基亚",
      "索尼爱立信",
      "华为"
  ];
    self_area = [
      330.0,
      14.4,
      88.8,
      270.0,
      21.6,
      48.8,
      7.2,
      6.8,
      24.4,
      32.0,
      116.0,
      3.4,
      22.4,
      1.0,
      224.0,
      264.0,
      64.0,
      24.0,
      35.0,
      4.0,
      8.0,
      19.0,
      12.0,
      42.0,
      252.0,
      16.0,
      236.0,
      7.0,
      136.0,
      13.0,
      166.0,
      4.0,
      16.0,
      67.0,
      700.0,
      350.0,
      300.0,
      2500.0,
      165.0,
      5000.0,
      30.0,
      2500.0,
      20000.0,
      2000.0,
      3000.0,
      40.0,
      1200.0,
      48000.0,
      11000.0,
      150000.0
    ];
    if (self_area.length > 100) {
      // 将数据分成10组，多余的个体将被合并
      var split_index = self_area.length / 10;
      group_self_name = group(self_name, split_index);
      group_self_area = group(self_area, split_index);
      if (self_area.length % 10 !== 0) {
        group_self_name[9].push.apply(group_self_name[9], group_self_name[10]);
        group_self_area[9].push.apply(group_self_area[9], group_self_area[10]);
      }
    }
    else {
      // 数据量小时10个一组
      group_self_name = group(self_name, 10);
      group_self_area = group(self_area, 10);
    }
    var timeline_axis = [];
    var index = 0;
    for (index = 0; index < group_self_area.length; index++) {
      timeline_axis[index] = (index + 1).toString();
    }
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart_self'));

    option = {
      baseOption: {
        timeline: {
          y: '88%',
          axisType: 'category',
          // realtime: false,
          // loop: false,
          autoPlay: true,
          // currentIndex: 2,
          playInterval: 1500,
          // controlStyle: {
          //     position: 'left'
          // },
          height: '10',
          data: timeline_axis,
          // label: {
          //     formatter : function(s) {
          //         return s + "组"
          //     }
          // }
        },
        tooltip: {},

        calculable: true,
        grid: {
          left: '0%',
          top: '10px',
          right: '0%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: "自营客户名称",
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
              },
            },

            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              // rotate:50,
              show: true,
              splitNumber: 15,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '6',
              },
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '人数',
            // max: 53500
            // max : 100
            axisLabel: {//y轴文字的配置
              textStyle: {
                color: "#fff",
                margin: 15
              },
              formatter: '{value} ㎡'//y轴的每一个刻度值后面加上单位
            },
          }
        ],
        series: [
          {
            name: '使用面积(㎡)',
            type: 'bar',
            barWidth: '50%', //柱子宽度
            barGap: 2, //柱子之间间距
          },
        ]
      },
      options: [
        {
          // title: {subtext: '1月生日人数分布-Acring'},
          xAxis: [
            {
              data: group_self_name[0],
            }
          ],
          series: [
            {
              data: group_self_area[0],
              itemStyle: {
                normal: {
                  color: "#A5DEE4"
                }
              },
            },
          ]
        },
        {
          // title : {subtext: '2月生日人数分布-Acring'},
          xAxis: [
            {
              data: group_self_name[1],
            }
          ],
          series: [
            {
              data: group_self_area[1],
              itemStyle: {
                normal: {
                  color: "#81C7D4"
                }
              },
            },
          ]
        },
        {
          // title : {subtext: '3月生日人数分布-Acring'},
          xAxis: [
            {
              data: group_self_name[2],
            }
          ],
          series: [
            {
              data: group_self_area[2],
              itemStyle: {
                normal: {
                  color: "#24936E"
                }
              },
            },
          ]
        },
        {
          // title : {subtext: '4月生日人数分布-Acring'},
          xAxis: [
            {
              data: group_self_name[3],
            }
          ],
          series: [{
            data: group_self_area[3], itemStyle: {
              normal: {
                color: "#5DAC81"
              }
            },
          },]
        },
        {
          // title : {subtext: '5月生日人数分布-Acring'},
          xAxis: [
            {
              data: group_self_name[4],
            }
          ],
          series: [{
            data: group_self_area[4], itemStyle: {
              normal: {
                color: "#A8D8B9"
              }
            },
          },]
        },
        {
          // title : {subtext: '6月生日人数分布-Acring'},
          xAxis: [
            {
              data: group_self_name[5],
            }
          ],
          series: [{
            data: group_self_area[5], itemStyle: {
              normal: {
                color: "#F596AA"
              }
            },
          },]
        },
        {
          // title : {subtext: '7月生日人数分布-Acring'},
          xAxis: [
            {
              data: group_self_name[6],
            }
          ],
          series: [{
            data: group_self_area[6], itemStyle: {
              normal: {
                color: "#E87A90"
              }
            },
          },]
        },
        {
          // title : {subtext: '8月生日人数分布-Acring'},
          xAxis: [
            {
              data: group_self_name[7],
            }
          ],
          series: [{
            data: group_self_area[7], itemStyle: {
              normal: {
                color: "#F4A7B9"
              }
            },
          },]
        },
        {
          // title : {subtext: '9月生日人数分布-Acring'},
          xAxis: [
            {
              data: group_self_name[8],
            }
          ],
          series: [{
            data: group_self_area[8], itemStyle: {
              normal: {
                color: "#DB8E71"
              }
            },
          },]
        },
        {
          // title : {subtext: '10月生日人数分布-Acring'},
          xAxis: [
            {
              'data': group_self_name[9],
            }
          ],
          series: [{
            data: group_self_area[9], itemStyle: {
              normal: {
                color: "#FB9966"
              }
            },
          },]
        },
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  //当月园区流量统计情况
  function echarts_accessMana() {
    xdays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    pdata = [3, 70, 10, 12, 20, 69, 26, 79, 40, 57, 32, 8, 88, 96, 47, 53, 42, 21, 23, 48, 5, 18, 98, 8, 97, 82, 22, 27, 46, 47, 49];
    vdata = [67, 78, 83, 48, 48, 3, 87, 19, 33, 34, 71, 64, 79, 16, 78, 90, 40, 44, 43, 17, 25, 11, 2, 41, 67, 21, 63, 3, 57, 28, 100];
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart_access'));
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#dddc6b'
          }
        }
      },
      legend: {
        top: '0%',
        data: ['进入园区人员数', '进入园区车辆数'],
        textStyle: {
          color: 'rgba(255,255,255,.5)',
          fontSize: '12',
        }
      },
      grid: {
        left: '10',
        top: '30',
        right: '10',
        bottom: '10',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: xdays,
        name: '日期',
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12,
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.2)'
          }

        },
      }, {
        axisPointer: { show: false },
        axisLine: { show: false },
        position: 'bottom',
        offset: 20,
      }],
      yAxis: [{
        type: 'value',
        name: '流量',
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12,
          },
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        }
      }],
      series: [
        {
          name: '进入园区人员数',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {

            normal: {
              color: '#0184d5',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(1, 132, 213, 0.4)'
              }, {
                offset: 0.8,
                color: 'rgba(1, 132, 213, 0.1)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
          },
          itemStyle: {
            normal: {
              color: '#0184d5',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            }
          },
          data: pdata
        },
        {
          name: '进入园区车辆数',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {

            normal: {
              color: '#00d887',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 216, 135, 0.4)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 216, 135, 0.1)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
          },
          itemStyle: {
            normal: {
              color: '#00d887',
              borderColor: 'rgba(221, 220, 107, .1)',
              borderWidth: 12
            }
          },
          data: vdata
        },
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  //各仓库使用情况统计
  function echarts_storge() {
    storage_name = [
      "天猫1库",
      "天猫2库",
      "天猫3库",
      "天猫4库",
      "天猫5库一层",
      "天猫6库一层",
      "天猫7库一层",
      "天猫8库一层",
      "天猫9库一层",
      "天猫10库一层",
      "天猫5库二层",
      "天猫6库二层",
      "天猫7库二层",
      "天猫8库二层",
      "天猫9库二层",
      "天猫10库二层",
      "京东1库",
      "京东2库",
      "京东3库",
      "京东4库",
      "京东5库",
      "京东6库",
      "京东7库",
      "京东8库",
      "京东9库",
      "京东10库",
      "京东11库",
      "京东12库",
      "京东13库",
      "京东14库",
      "京东15库",
      "京东16库",
      "京东17库",
      "京东18库",
      "京东19库",
      "京东20库",
      "京东21库",
      "京东22库",
      "京东23库",
      "京东24库",
      "京东25库",
      "阿里巴巴1库",
      "阿里巴巴2库",
      "阿里巴巴3库",
      "阿里巴巴4库",
      "阿里巴巴5库",
      "阿里巴巴6库",
      "阿里巴巴7库",
      "阿里巴巴8库",
      "阿里巴巴9库",
      "阿里巴巴10库",
      "阿里巴巴11库",
      "阿里巴巴12库",
      "阿里巴巴13库",
      "阿里巴巴14库",
      "阿里巴巴15库",
      "阿里巴巴16库",
      "阿里巴巴17库",
      "阿里巴巴18库",
      "阿里巴巴19库",
      "阿里巴巴20库",
      "阿里巴巴21库",
      "阿里巴巴22库",
      "阿里巴巴23库",
      "阿里巴巴24库",
      "阿里巴巴25库",
      "阿里巴巴26库",
      "阿里巴巴27库",
      "阿里巴巴28库",
      "阿里巴巴29库",
      "阿里巴巴30库"
    ];
    total_area = [
      9776.0,
      9776.0,
      13165.0,
      13165.0,
      11000.0,
      11000.0,
      11000.0,
      11000.0,
      11000.0,
      11000.0,
      11000.0,
      11000.0,
      11000.0,
      11000.0,
      11000.0,
      11000.0,
      3240.0,
      3240.0,
      11400.0,
      11400.0,
      11400.0,
      3771.5,
      3771.5,
      3970.7,
      3771.5,
      5400.0,
      5400.0,
      5400.0,
      5400.0,
      5400.0,
      5400.0,
      3771.5,
      3771.5,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      9370.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      6629.0,
      6629.0,
      6629.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      6629.0,
      6629.0,
      9370.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      6656.0,
      6656.0,
      6656.0,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ];
    remain_area = [
      9776.0,
      4519.0,
      604.0,
      3793.0,
      1032.0,
      774.0,
      3524.0,
      1032.0,
      774.0,
      1032.0,
      1032.0,
      1032.0,
      1032.0,
      1032.0,
      11000.0,
      11000.0,
      0.0,
      0.0,
      2768.0,
      11400.0,
      0.0,
      1971.5,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      3179.0,
      5179.0,
      0.0,
      5179.0,
      0.0,
      5179.0,
      9370.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      1450.0,
      1450.0,
      1450.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ];
    use_area = [
      0.0,
      5257.0,
      12561.0,
      9372.0,
      9968.0,
      10226.0,
      7476.0,
      9968.0,
      10226.0,
      9968.0,
      9968.0,
      9968.0,
      9968.0,
      9968.0,
      0.0,
      0.0,
      3240.0,
      3240.0,
      8632.0,
      0.0,
      11400.0,
      1800.0,
      3771.5,
      3970.7,
      3771.5,
      5400.0,
      5400.0,
      5400.0,
      5400.0,
      5400.0,
      5400.0,
      3771.5,
      3771.5,
      0.0,
      0.0,
      0.0,
      0.0,
      2000.0,
      0.0,
      5179.0,
      0.0,
      5179.0,
      0.0,
      0.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      6629.0,
      6629.0,
      9370.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      5179.0,
      6656.0,
      6656.0,
      6656.0,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ];
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart_storage'));

    option = {
      //  backgroundColor: '#00265f',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      grid: {
        left: '0%',
        top: '10px',
        right: '0%',
        bottom: '4%',
        containLabel: true
      },
      legend: {
        data: ['已使用面积', '未使用面积', '总面积',],
        textStyle: {
          color: '#B4B4B4'
        },
        top: '7%',
      },
      xAxis: [{
        type: 'category',
        data: storage_name,
        name: '仓库名称',
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            width: 1,
            type: "solid"
          },
        },

        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          // rotate:50,
          show: true,
          splitNumber: 15,
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: '4',
          },
        },
      }],
      yAxis: [{
        type: 'value',
        name: '面积',
        axisLabel: {
          formatter: '{value} ㎡',
          show: true,
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: '8',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255,255,255,0.1)",
            width: 1,
            type: "solid"
          },
        },
      }],
      series: [
        {
          name: '总面积',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 4,
          // yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#F02FC2'
            },
          },
          data: total_area
        },
        {
          name: '已使用面积',
          type: 'bar',
          // barWidth: 10,
          stack: 'x',
          itemStyle: {
            normal: {
              barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#956FD4' },
                  { offset: 1, color: '#3EACE5' }
                ]
              )
            }
          },
          data: use_area
        },
        {
          name: '未使用面积',
          type: 'bar',
          barGap: '-100%',
          // barWidth: 10,
          stack: 'x',
          itemStyle: {
            normal: {
              barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: 'rgba(156,107,211,0.5)' },
                  { offset: 0.2, color: 'rgba(156,107,211,0.3)' },
                  { offset: 1, color: 'rgba(156,107,211,0)' }
                ]
              )
            }
          },
          data: remain_area
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
})
