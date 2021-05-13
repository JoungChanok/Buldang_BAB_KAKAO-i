const config = require('config')

const { timeStamp } = require('../common/util')
const AdminModel = require('../model/Admin')

const Admin = {}

Admin.init = async () => {
  const id = config.get('admin.id')
  const password = config.get('admin.password')
  await AdminModel.init(id, password)
  console.log(timeStamp() + '관리 모델 정의'.cyan)
  console.log(
    timeStamp() + '관리자 계정 생성중이에요 '.cyan + `${id}/${password}`.blue
  )
}

Admin.auth = async user => {
  try {
    return await AdminModel.auth(user)
  } catch (e) {
    console.log(timeStamp() + e.message.red)
    return false
  }
}

Admin.create = async user => {
  try {
    await AdminModel.create(user)
    console.log(timeStamp() + '관리자 계정이 생성됐어요.'.yellow)
  } catch (e) {
    console.log(timeStamp() + e.message.red)
  }
}

Admin.delete = async user => {
  try {
    await AdminModel.delete(user)
    console.log(
      timeStamp() + `관리자 계정이 삭제되었어요. id: ${user.id}`.yellow
    )
  } catch (e) {
    console.log(timeStamp() + e.message.red)
  }
}

Admin.list = async () => {
  try {
    return await AdminModel.list()
  } catch (e) {
    console.log(timeStamp() + e.message.red)
  }
}

Admin.update = async user => {
  try {
    const affectedRow = await AdminModel.update(user)
    if (affectedRow) {
      console.log(
        timeStamp() +
          '관리자 암호가 변경되지 않았어요. 아이디를 조회해주세요'.yellow
      )
    } else {
      console.log(timeStamp() + '관리자 암호가 변경됬어요.'.yellow)
    }
  } catch (e) {
    console.log(timeStamp() + e.message.red)
  }
}

module.exports = Admin
