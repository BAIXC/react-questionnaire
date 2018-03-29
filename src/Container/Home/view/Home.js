import React from 'react';
import { Table, Divider, Button, Modal } from 'antd';
import { Link} from 'react-router-dom';
import { checkStatusByDeadline } from '../../../util/util';
import './Home.css';
const confirm = Modal.confirm;
class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			deleteArr : []
		};
		this.columns = [{
		  title: '标题',
		  dataIndex: 'title',
		}, {
		  title: '截止时间',
		  dataIndex: 'deadline',
		}, {
				title: '状态',
				dataIndex : 'status',
				render: (text) => {
					const stateClassName = (text === 'publishing') ? 'Qn-publishing' : null;
					const judgeState = (text) => {
						switch(text){
							case 'unpublished':
								return '未发布';
							case 'publishing':
								return '发布中';
							case 'over':
								return '已结束';
							default:
								return '状态出错'
						}
					}
					const status = judgeState(text);
					return <span className = { stateClassName }>{status}</span>;
				}
		}, {
				title: '操作',
				key: 'action',
				render: (text, record) => {
				  	switch(record.status){
						case 'unpublished':
						return(<span>
								<Link to = {{
											pathname: '/edit',
											state: { questionnaireId : record.id,
											editType : 'edit' }
											}}  
										className = "action-link"
										>编辑</Link>
								<Divider type="vertical" />
									<a 
										className = "action-link"
										onClick = {() =>{ this.deleteConfirm(record.id) }}
									>删除</a>
				   		 	</span>);
						case 'publishing':
						return(<span>
									<a 
										className = "action-link"
										onClick = {() =>{ this.deleteConfirm(record.id) }}
									>删除</a>

								<Divider type="vertical" />

								<Link to = {{
											pathname: '/checkData',
											state: { questionnaireId : record.id }
											}} 
									className = "action-link">查看数据
								</Link>

								<Divider type="vertical" />

								<Link to = {{
											pathname: '/fill',
											state: { questionnaireId : record.id }
											}} 
										className = "action-link">填写问卷</Link>
				   		 	</span>);
						case 'over':
						return(<span>
									<a 
										className = "action-link"
										onClick = {() =>{ this.deleteConfirm(record.id) }}
									>删除</a>
								<Divider type="vertical" />
								<Link to = {{
											pathname: '/checkData',
											state: { questionnaireId : record.id }
											}} 
									className = "action-link">查看数据
								</Link>
				   		 	</span>);
						default:
						return null;
					}
				}
			}
		];
		this.onBatchClick = this.onBatchClick.bind(this);
		this.deleteConfirm = this.deleteConfirm.bind(this);
		this.onCreate = this.onCreate.bind(this);
	}
	componentWillMount(){
		const questionnaires = this.props.byId;
		const updateStatus = this.props.updateStatus;
		for(var id in questionnaires){
			const deadline = questionnaires[id].deadline;
			const isOverdue = checkStatusByDeadline(deadline);
			if(isOverdue){
				updateStatus(id,'over');
			}
		}
	}
	deleteConfirm(id) {
		const deleteQuestionnaire = this.props.deleteQuestionnaire;
		confirm({
			title: '确定要删除问卷吗？',
			content : '删除操作不可逆',
		    okText: '删除',
		    okType : 'danger',
		    cancelText: '取消',
			onOk() {
				deleteQuestionnaire(id);
			},
			onCancel() {
			    console.log('Cancel');
			},
    	});
	}
	onBatchClick(){
		const deleteArr = [...this.state.deleteArr];
		const batchDelete = this.props.batchDelete;
		confirm({
			title: '确定要删除这些问卷吗？',
			content : '删除操作不可逆',
		    okText: '删除',
		    okType : 'danger',
		    cancelText: '取消',
			onOk() {
				batchDelete(deleteArr);
			},
			onCancel() {
			    console.log('Cancel');
			},
    	});
	}
	rowSelection(){
		return (
		{
			onChange: (selectedRowKeys, selectedRows) => {
    			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    			this.setState({
    				deleteArr : [...selectedRowKeys]
    			});
  			}
  		}
  		);
	}
	componentDidMount(){
	
	}
	onCreate(){
		const currentId = this.props.qnnCurrentId;
		this.props.createQuestionnaire(currentId);
		const data = {
			pathname : '/edit',
			state : {editType:'create'}
		};
		this.props.history.push(data);
	}
	render(){
		const {allIds,dataSource} = this.props;
		const homeComponent = allIds.length > 0 ?
		<div id = "Home" ref="home">
			<Table 
				rowKey = 'id'
				rowSelection={this.rowSelection()} 
				columns={this.columns} 
				dataSource={dataSource}
				pagination = {false} />
			<Button type = 'primary' onClick = {this.onBatchClick}>批量删除</Button>
			<Button 
				type = 'primary'
				onClick = {this.onCreate}>
				新建问卷
			</Button>
		</div> :
		<div className = "new-Qnn">
			<Button size = "large" type = 'primary'>
				<Link to = {{
							pathname: '/edit',
							state: { 
								editType : 'create' }
							}}  
				className = "action-link"
				>+新建问卷</Link>
			</Button>
		</div>

		return homeComponent;
	}
}
export default Home;