import request from './request';

const createRequestAction = requestCreator => {
  return requestKey => (...actionArgs) => dispatch => {
    const requestStructure = requestCreator(...actionArgs);

    return dispatch(request(requestKey, requestStructure));
  };
};

export default createRequestAction;
