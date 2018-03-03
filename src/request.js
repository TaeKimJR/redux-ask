import * as actions from './actions';
import { internalSelectors } from './selectors';

const request = (key, {
  method,
  url,
  body,
  onSuccess,
  onFailure,
  requestOptions = {},
  fetchOptions = {},
}) => (dispatch, getState) => {
  const state = getState();

  // TODO: Check if already being sent (is pending, no duplicate requests)

  dispatch(actions.setInitial(key)());
  dispatch(actions.setPending(key)());

  const configRequestOptions = internalSelectors.requestOptionsSelector(state);
  const finalRequestOptions = {
    ...configRequestOptions,
    ...requestOptions,
    method,
    body: body ? JSON.stringify(body) : undefined,
  };

  const configFetchOptions = internalSelectors.fetchOptionsSelector(state);
  const finalFetchOptions = {
    ...configFetchOptions,
    ...fetchOptions,
  };

  // TODO: request options and fetch options may be the same thing
  return fetch(new Request(url, finalRequestOptions), finalFetchOptions)
    .then(res => {
      const isUnauthenticated = res.status === 401;
      if (isUnauthenticated) {
        const configOnUnauthenticated = internalSelectors.onUnauthenticatedSelector(state);
        if (configOnUnauthenticated) {
          dispatch(configOnUnauthenticated());
        }
      }

      // TODO: May need to skip json()
      const isOK = res.ok;
      if (isOK) {
        return res.json();
      }

      // hasError
      return res.json()
        .then(json => {
          dispatch(actions.setFailure(key)(json));

          if (onFailure) {
            dispatch(onFailure(json));
          }

          const configOnFailure = internalSelectors.onFailureSelector(state);
          if (configOnFailure) {
            dispatch(configOnFailure(json));
          }
        });
    })
    .then(res => {
      const resultPromise = new Promise(r => r(res));

      const configOnSuccess = internalSelectors.onSuccessSelector(state);
      if (configOnSuccess) {
        dispatch(configOnSuccess(res));
      }

      if (onSuccess) {
        return Promise.all([
          resultPromise,
          dispatch(onSuccess(res)),
        ]);
      }

      return Promise.all([resultPromise]);
    })
    .then(([res]) => {
      dispatch(actions.setSuccess(key)(res));
      return res;
    });
};

export default request;
