/**
一些工具方法
工具方法中尽量没有不涉及具体逻辑，所以检测类的方法返回值大部分设置为true/false,
以表示检测结果
*/
import moment from 'moment';
import { Modal } from 'antd';
//深拷贝
const cloneObject = (obj) => JSON.parse(JSON.stringify(obj));

//检测deadline是否设置以及是否设置正确
const checkDeadline = (deadline) => {
	const now = moment().format('YYYY-MM-DD');
	console.log(deadline)
	let isLegal = true;
	if(deadline === ''){
		Modal.warning({
			title: '请设置截止日期'
		});
		return false;
	}
	else if(deadline !== ''){
		isLegal = moment(now).isBefore(deadline) ? true : false;
		if(isLegal){
			return true;
		}
		else {
			Modal.warning({
				title: '请正确设置截止日期',
				content: '截止日期应当大于当前日期'
			});
			return false;
		}
	}
	else {
		throw new Error('检测deadline出错')
	}
}

//检测问卷是否已经到达截止日期
//若到达截止日期则更新发布状态，更改页面
//否则，不做变化
const checkStatusByDeadline = (deadline) => {
	const now = moment().format('YYYY-MM-DD');

	const isOverdue = moment(now).isBefore(deadline) ? false : true;
	return isOverdue;
}
export {cloneObject,checkDeadline,checkStatusByDeadline}



















