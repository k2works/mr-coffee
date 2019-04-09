const apiUtil = require('../utils/ApiUtil');

exports.registContact = async(info) => {
  return await apiUtil.apiCall(info)
};
