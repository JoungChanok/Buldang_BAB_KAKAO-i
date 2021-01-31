const { timeStamp } = require('../common/util')
const { Meal: MealModel, init } = require('../model/Meal')

var Meal = {}

Meal._week = ['일', '월', '화', '수', '목', '금', '토']

Meal.init = async function (school) {
  this.school = school;
  await init();
  console.log(timeStamp() + '급식 데이터 모델을 정의합니다.'.cyan);
}

Meal.update = async function () {
  try {
    const mealInfo = await this.school.getMeal({
      default: '😥 급식 정보가 없습니다 😥', 
    }); 
    const date = new Date() 

    await MealModel.destroy({
      where: {},
      truncate: true
    })

    await MealModel.create({
      date: String(date), 
      meal: JSON.stringify(mealInfo),
    });

    console.log(timeStamp() + '급식 데이터를 갱신합니다.'.green)
  } catch (e) {
    console.log(timeStamp() + e.message.red)
  }
}

Meal.get = async function (type) {
  try {
    const row = await MealModel.findOne();
    const meal = JSON.parse(row.meal); 

    const today = new Date();
    const tomorrow = new Date();

    tomorrow.setDate(today.getDate() + 1);

    if (type === 'today') {
      if (meal[String(today.getDate())] === '😥 급식 정보가 없습니다 😥')
      return `${today.getMonth() + 1}월 ${today.getDate()}일 ${this._week[today.getDay()]}요일`.replace('수요일','수요일 [잔반없는날]') 
        + '\n\n' + meal[String(today.getDate())].replace(/[,]/g,', ').replace(/[.]/g,'').replace(/[0-9]/g,'').replace('[석식]','\n[석식]');
    } else if (type === 'tomorrow') { 
      if (tomorrow.getMonth() != today.getMonth()) 
        return '🤮 내일 급식은 내일 확인이 가능해요';
      if (meal[String(tomorrow.getDate())] === '😥 급식 정보가 없습니다 😥')
      return `${tomorrow.getMonth() +1 }월 ${tomorrow.getDate()}일 ${this._week[tomorrow.getDay()]}요일`.replace('수요일','수요일 [잔반없는날]') 
        + '\n\n' + meal[String(tomorrow.getDate())].replace(/[,]/g,', ').replace(/[.]/g,'').replace(/[0-9]/g,'').replace('[석식]','\n[석식]');
      }
  } catch (e) {
    console.log(timeStamp() + e.message.red)
    return '🤪 급식 데이터를 갱신하는 중 문제가 발생했습니다 🤪'
  }
}

Meal.getWeek = async function(date) {
  const row = await MealModel.findOne();
  const meal = JSON.parse(row.meal); 
  const today = new Date();
  const week = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i); 
    
    const month = date.getMonth() + 1;
    const stringDate = String(date.getDate()); 

    if (today.getMonth() !== date.getMonth()) break; 
 
    week.push({
      date:`${month}월 ${stringDate}일 ${this._week[date.getDay()]}요일`.replace('수요일','수요일 [잔반없는날]'),
      meal: meal[stringDate].replace(/[,]/g,', ').replace(/[.]/g,'').replace(/[0-9]/g,'').replace('[석식]','\n[석식]')
    }) 
  }

  return week;
}
module.exports = Meal
