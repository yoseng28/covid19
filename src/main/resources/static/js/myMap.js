$(function(){
	china_num();
	
})

function translate_province(value){
	dicts={
	'安徽': 'Anhui',
	'北京': 'Beijing',
	'福建': 'Fujian',
	'甘肃': 'Gansu',
	'广东': 'Guangdong',
	'广西': 'Guangxi',
	'贵州': 'Guizhou',
	'海南': 'Hainan',
	'河北': 'Hebei',
	'河南': 'Henan',
	'黑龙江': 'Heilongjiang',
	'湖北': 'Hubei',
	'湖南': 'Hunan',
	'吉林': 'Jilin',
	'江苏': 'Jiangsu',
	'江西': 'Jiangxi',
	'辽宁': 'Liaoning',
	'内蒙古': 'Inner Mongolia',
	'宁夏': 'Ningxia',
	'青海': 'Qinghai',
	'山东': 'Shandong',
	'山西': 'Shanxi',
	'陕西': 'Shaanxi',
	'上海': 'Shanghai',
	'四川': 'Sichuan',
	'天津': 'Tianjin',
	'西藏': 'Tibet',
	'新疆': 'Xinjiang',
	'云南': 'Yunnan',
	'浙江': 'Zhejiang',
	'重庆': 'Chongqing',
	'香港': 'Hong Kong',
	'澳门': 'Macao',
	'台湾': 'Taiwan'
	}
	for(var d in dicts){
		if (dicts[d]==value){
			return d;
		}
	}
	
}

function china_num(){
	$.ajax({
	    type : "POST",
	    url : "china/selectAll",
	    data : {},
		success:function(result){
			let str = ''
			for(let r in result){
				str = str + "{name:'"+translate_province(result[r]['Province_State']) +"'," 
				+ "value:" + result[r]['Confirmed'] + "},";
			}
			var r = '['+ str.substr(0,str.length-1) +']';
			console.info(eval('(' + r + ')'));
		
			echarts_map(eval('(' + r + ')'));
		},
	    error : function(e){
	        console.log(e.status);
	        console.log(e.responseText);
	    }
	});
}

function echarts_map(datas){
	// echarts使用dom，需要JQuery对象转换
 	var myChart = echarts.init(document.querySelector(".map .chart"));
	// 指定图表的配置项和数据
	var data = datas;
	var geoCoordMap = {
		'山东':[117.000923, 36.675807],
	    '河北':[115.48333,38.03333],
	    '吉林':[125.35000,43.88333],
	    '黑龙江':[127.63333,47.75000],
	    '辽宁':[123.38333,41.80000],
	    '内蒙古':[111.670801, 41.818311],
	    '新疆':[87.68333,43.76667],
	    '甘肃':[103.73333,36.03333],
	    '宁夏':[106.26667,37.46667],
	    '山西':[112.53333,37.86667],
	    '陕西':[108.95000,34.26667],
	    '河南':[113.65000,34.76667],
	    '安徽':[117.283042, 31.86119],
	    '江苏':[119.78333,32.05000],
	    '浙江':[120.20000,30.26667],
	    '福建':[118.30000,26.08333],
	    '广东':[113.23333,23.16667],
	    '江西':[115.90000,28.68333],
	    '海南':[110.35000,20.01667],
	    '广西':[108.320004, 22.82402],
	    '贵州':[106.71667,26.56667],
	    '湖南':[113.00000,28.21667],
	    '湖北':[114.298572, 30.584355],
	    '四川':[104.06667,30.66667],
	    '云南':[102.73333,25.05000],
	    '西藏':[91.00000,30.60000],
	    '青海':[96.75000,36.56667],
	    '天津':[117.20000,39.13333],
	    '上海':[121.55333,31.20000],
	    '重庆':[106.45000, 29.56667],
	    '北京': [116.41667,39.91667],
	    '台湾': [121.30, 25.03],
	    '香港': [114.10000,22.20000],
	    '澳门': [113.50000,22.20000]
	};
	
	var convertData = function (data) {
	    var res = [];
	    for (var i = 0; i < data.length; i++) {
	        var geoCoord = geoCoordMap[data[i].name];
	        if (geoCoord) {
	            res.push({
	                name: data[i].name,
	                value: geoCoord.concat(data[i].value)
	            });
	        }
	    }
	    return res;
	};
	
option = {
	title: {
	    text: 'yoseng@163.com',
	    subtext: '数据来源：CSSEGISandData',
	    sublink: 'https://github.com/CSSEGISandData/COVID-19',
	    left: 'center'
	},
    tooltip : {
        trigger: 'item'
    },
	geo: {
        map: 'china',
        label: {
            emphasis: {
                show: true,
				color: "#fff"
            }
        },
        roam: false,
        itemStyle: {
            normal: {
                  areaColor: "rgba(43, 196, 243, 0.42)",
		          borderColor: "rgba(43, 196, 243, 1)",
		          borderWidth: 1
            },
            emphasis: {
                areaColor: "#2B91B7"
            }
        }
	},
	series : [{
		name: '确诊人数',
		type: 'scatter',
		coordinateSystem: 'geo',
		data: convertData(data),
		symbolSize: function (val) {
			console.info('val:',val);
		    if(val[2]>5000){
					return val[2] / 1000;
				}
			    return val[2] / 50;
	        },
    encode: {
        value: 2
    },
    label: {
        formatter: '{b}',
        position: 'right',
        show: false
    },
	    itemStyle: {color: 'purple'},
	    emphasis: {label: {show: true}}
	},
    {
	    name: '确诊人数',
	    type: 'effectScatter',
	    coordinateSystem: 'geo',
	    data: convertData(data.sort(function (a, b) {
	        return b.value - a.value;
	    }).slice(0, 6)),
	    symbolSize: function (val) {
	        if(val[2]>5000){
				return val[2] / 1000;
			}
		    return val[2] / 50;
    },
    encode: {
        value: 2
    },
    showEffectOn: 'render',
    rippleEffect: {
        brushType: 'stroke'
    },
	    hoverAnimation: true,
	    label: {
	        formatter: '{b}',
	        position: 'right',
	        show: true
    },
	    itemStyle: {
	        color: 'purple',
	        shadowBlur: 10,
	        shadowColor: '#333'
    },
    	zlevel: 1
	}
    ]
};	
	myChart.setOption(option);
}