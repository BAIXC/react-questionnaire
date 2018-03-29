/*
*存储/获取本地数据的方法
*@param {Object} obj       设置需要存进（获取）localstorage的对象
*@param {String} name      设置在对象在本地存储（获取）中的名称
*/
function setStorage(name,obj){
	var obj_string = JSON.stringify(obj);
	localStorage.setItem(name,obj_string);
}

function getStorage(name){
	var obj_json = localStorage.getItem(name);
	var obj      = JSON.parse(obj_json); 
	return obj;
}

function setData(){
	let appData = {
		questionnaires: {
			currentId: 3,
			byId: {
			  Qnn1: {
			    id: 'Qnn1',
			    title: '大学生学习生活情况调查',
			    status: 'unpublished',
			    deadline: '2019-12-24',
			    questions: ['qn1','qn2','qn3'],
			    charts: []
			  },
			  Qnn2: {
			    id: 'Qnn2',
			    title: '大学生消费调查',
			    status: 'publishing',
			    deadline: '2018-12-24',
			    questions: ['qn4','qn5','qn6'],
			    charts: [
			      {
			        id: 'qn4-chart',
			        title: {
			          text: '你每个月的生活费是多少？'
			        },
			        tooltip: {},
			        series: [
			          {
			            type: 'pie',
			            name: '人数',
			            radius: '75%',
			            center: [
			              '50%',
			              '60%'
			            ],
			            data: [
			              {
			                value: 30,
			                name: '600以下'
			              },
			              {
			                value: 170,
			                name: '600~1000'
			              },
			              {
			                value: 220,
			                name: '1000~1500'
			              },
			              {
			                value: 65,
			                name: '1500~2000'
			              },
			              {
			                value: 15,
			                name: '2000以上'
			              }
			            ]
			          }
			        ]
			      },
			      {
			        id: 'qn5-chart',
			        title: {
			          text: '请问你是否有记账的习惯？'
			        },
			        tooltip: {},
			        series: [
			          {
			            type: 'pie',
			            name: '人数',
			            radius: '75%',
			            center: [
			              '50%',
			              '60%'
			            ],
			            data: [
			              {
			                value: 75,
			                name: '一直在坚持记账'
			              },
			              {
			                value: 375,
			                name: '偶尔会记账'
			              },
			              {
			                value: 50,
			                name: '从未记过账'
			              },
			              {
			                value: 135,
			                name: '考公务员'
			              }
			            ]
			          }
			        ]
			      },
			      {
			        id: 'qn6-chart',
			        title: {
			          text: '你生活费的来源'
			        },
			        tooltip: {},
			        xAxis: {
			          data: [  
					      '来自家庭',
					      '兼职',
					      '校内奖学金',
					      '贷款'
			          ]
			        },
			        yAxis: {},
			        series: [
			          {
			            type: 'bar',
			            data: [
			              350,84,150,60
			            ],
			            barMaxWidth: '80px'
			          }
			        ]
			      }
			    ]
			  },
			  Qnn3: {
			    id: 'Qnn3',
			    title: '大学生网购情况调查',
			    status: 'over',
			    deadline: '2017-12-24',
			    questions: ['qn7','qn8','qn9','qn10'],
			    charts: [
			      {
			        id: 'qn7-chart',
			        title: {
			          text: '请问你平时经常网购吗？'
			        },
			        tooltip: {},
			        series: [
			          {
			            type: 'pie',
			            name: '人数',
			            radius: '75%',
			            center: [
			              '50%',
			              '60%'
			            ],
			            data: [
			              {
			                value: 335,
			                name: '经常网购'
			              },
			              {
			                value: 210,
			                name: '偶尔网购'
			              },
			              {
			                value: 55,
			                name: '从不网购'
			              }
			            ]
			          }
			        ]
			      },
			      {
			        id: 'qn8-chart',
			        title: {
			          text: '你选择网购的主要原因是什么？'
			        },
			        tooltip: {},
			        xAxis: {
			          data: [      
					      '方便快捷',
					      '品种齐全',
					      '价格便宜',
					      '时尚有趣',
					      '不受时间限制'
			          ]
			        },
			        yAxis: {},
			        series: [
			          {
			            type: 'bar',
			            data: [
			              350,84,150,60,30
			            ],
			            barMaxWidth: '80px'
			          }
			        ]
			      },
			      {
			        id: 'qn9-chart',
			        title: {
			          text: '你通常会在哪里网购？'
			        },
			        tooltip: {},
			        xAxis: {
			          data: [      
					      '淘宝网',
					      '京东商城',
					      '天猫',
					      '亚马逊',
					      '拍拍网'
			          ]
			        },
			        yAxis: {},
			        series: [
			          {
			            type: 'bar',
			            data: [
			              250,84,158,60,30
			            ],
			            barMaxWidth: '80px'
			          }
			        ]
			      },
			      {
			        id: 'qn10-chart',
			        title: {
			          text: '你对网购有什么改善的建议吗？'
			        },
			        tooltip: {},
			        series: [
			          {
			            type: 'pie',
			            name: '人数',
			            radius: '75%',
			            center: [
			              '50%',
			              '60%'
			            ],
			            data: [
			              {
			                value: 335,
			                name: '有效回答'
			              },
			              {
			                value: 80,
			                name: '无效回答或未作答'
			              }
			            ]
			          }
			        ]
			      }
			    ]
			  }
			},
			allIds: [
			  'Qnn1',
			  'Qnn2',
			  'Qnn3'
			]
		},
		questions: {
			currentId : 10,
			byId: {
			  qn1: {
			    id: 'qn1',
			    title: '请问你是大几的学生',
			    type: 'radio',
			    options: [
			      '大一',
			      '大二',
			      '大三',
			      '大四'
			    ]
			  },
			  qn2: {
			    id: 'qn2',
			    title: '请问你平时课余时间都在干什么？',
			    type: 'checkbox',
			    options: [
			      '看电影',
			      '看书',
			      '打游戏',
			      '复习课内知识',
			      '参加社团活动'
			    ]
			  },
			  qn3: {
			    id: 'qn3',
			    title: '你对未来的规划',
			    type: 'textarea',
			    text: '',
			    isRequired : false
			  },
			  qn4: {
			    id: 'qn4',
			    title: '请问你每个月的生活费是多少？',
			    type: 'radio',
			    options: [
			      '600以下',
			      '600~1000',
			      '100~1500',
			      '1500~2000',
			      '2000以上'
			    ]
			  },
			  qn5: {
			    id: 'qn5',
			    title: '请问你是否有记账的习惯？',
			    type: 'radio',
			    options: [
			      '一直在坚持记账',
			      '偶尔会记账',
			      '从未记过账'
			    ]
			  },
			  qn6: {
			    id: 'qn6',
			    title: '请问你的生活费来源是',
			    type: 'checkbox',
			    options: [
			      '来自家庭',
			      '兼职',
			      '校内奖学金',
			      '贷款'
			    ]
			  },
			  qn7: {
			    id: 'qn7',
			    title: '请问你平时会经常网购吗？',
			    type: 'radio',
			    options: [
			      '经常网购',
			      '偶尔网购',
			      '从未在网上买过东西'
			    ]
			  },
			  qn8: {
			    id: 'qn8',
			    title: '你选择网购的主要原因是什么？',
			    type: 'checkbox',
			    options: [
			      '方便快捷',
			      '品种齐全',
			      '价格便宜',
			      '时尚有趣',
			      '不受时间限制'
			    ]
			  },
			  qn9: {
			    id: 'qn9',
			    title: '你通常会在哪里进行网购？',
			    type: 'checkbox',
			    options: [
			      '淘宝网',
			      '京东商城',
			      '天猫',
			      '亚马逊',
			      '拍拍网'
			    ]
			  },
			  qn10: {
			    id: 'qn10',
			    title: '你对网购有什么改善的建议吗？',
			    type: 'textarea',
			    text: '',
			    isRequired : false
			  }
			},
		}
};
	//检测本地存储是否已经被填充，即页面之前是否被访问过
	var storage = window.localStorage;
	//如果没有被访问过，则填入初始化内容
	if(!storage.getItem('appData')){
		setStorage('appData',appData);
	}
	//如果已经被填充过，则更新初始的appData
	else{
		appData = getStorage('appData');
	}
	return appData;
}
export { setData, setStorage, getStorage };