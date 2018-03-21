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
			    title: 'First',
			    status: 'unpublished',
			    deadline: '2019-12-24',
			    questions: ['qn1','qn2','qn3'],
			    charts: []
			  },
			  Qnn2: {
			    id: 'Qnn2',
			    title: 'Second',
			    status: 'publishing',
			    deadline: '2018-12-24',
			    questions: ['qn4','qn5','qn6'],
			    charts: [
			      {
			        id: 'qn4-chart',
			        title: {
			          text: '你所在的年级'
			        },
			        tooltip: {},
			        xAxis: {
			          data: [
			            '大一',
			            '大二',
			            '大三',
			            '大四'
			          ],
			          name: '年级'
			        },
			        yAxis: {
			          name: '人数'
			        },
			        series: [
			          {
			            name: '人数',
			            type: 'bar',
			            data: [
			              5,
			              20,
			              36,
			              10
			            ],
			            barMaxWidth: '80px'
			          }
			        ]
			      },
			      {
			        id: 'qn5-chart',
			        title: {
			          text: '大学毕业后你打算做什么'
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
			                name: '工作'
			              },
			              {
			                value: 310,
			                name: '考研'
			              },
			              {
			                value: 34,
			                name: '出国'
			              },
			              {
			                value: 135,
			                name: '考公务员'
			              },
			              {
			                value: 15,
			                name: '创业'
			              }
			            ]
			          }
			        ]
			      },
			      {
			        id: 'qn6-chart',
			        title: {
			          text: '你对自己未来的详细规划'
			        },
			        tooltip: {},
			        xAxis: {
			          data: [
			            '有效回答',
			            '无效回答或未作答'
			          ]
			        },
			        yAxis: {},
			        series: [
			          {
			            type: 'bar',
			            data: [
			              20,
			              2
			            ],
			            barMaxWidth: '80px'
			          }
			        ]
			      }
			    ]
			  },
			  Qnn3: {
			    id: 'Qnn3',
			    title: 'Third',
			    status: 'over',
			    deadline: '2017-12-24',
			    questions: ['qn7','qn8','qn9'],
			    charts: [
			      {
			        id: 'qn7-chart',
			        title: {
			          text: '你所在的年级'
			        },
			        tooltip: {},
			        xAxis: {
			          data: [
			            '大一',
			            '大二',
			            '大三',
			            '大四'
			          ],
			          name: '年级'
			        },
			        yAxis: {
			          name: '人数'
			        },
			        series: [
			          {
			            name: '人数',
			            type: 'bar',
			            data: [
			              5,
			              20,
			              36,
			              10
			            ],
			            barMaxWidth: '80px'
			          }
			        ]
			      },
			      {
			        id: 'qn8-chart',
			        title: {
			          text: '大学毕业后你打算做什么'
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
			                name: '工作'
			              },
			              {
			                value: 310,
			                name: '考研'
			              },
			              {
			                value: 34,
			                name: '出国'
			              },
			              {
			                value: 135,
			                name: '考公务员'
			              },
			              {
			                value: 15,
			                name: '创业'
			              }
			            ]
			          }
			        ]
			      },
			      {
			        id: 'qn9-chart',
			        title: {
			          text: '你对自己未来的详细规划'
			        },
			        tooltip: {},
			        xAxis: {
			          data: [
			            '有效回答',
			            '无效回答或未作答'
			          ]
			        },
			        yAxis: {},
			        series: [
			          {
			            type: 'bar',
			            data: [
			              20,
			              2
			            ],
			            barMaxWidth: '80px'
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
			currentId : 9,
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
			    title: '请问你是大几的学生',
			    type: 'radio',
			    options: [
			      '大一',
			      '大二',
			      '大三',
			      '大四'
			    ]
			  },
			  qn5: {
			    id: 'qn5',
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
			  qn6: {
			    id: 'qn6',
			    title: '你对未来的规划',
			    type: 'textarea',
			    text: '',
			    isRequired : true
			  },
			  qn7: {
			    id: 'qn7',
			    title: '请问你是大几的学生',
			    type: 'radio',
			    options: [
			      '大一',
			      '大二',
			      '大三',
			      '大四'
			    ]
			  },
			  qn8: {
			    id: 'qn8',
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
			  qn9: {
			    id: 'qn9',
			    title: '你对未来的规划',
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