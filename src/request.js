import * as actions from './actions';
import { internalSelectors } from './selectors';

const request = (key, {
  method,
  url,
  body,
  onSuccess,
  onFailure,
  onUnauthenticated,
  options = {},
}) => (dispatch, getState) => {
  const state = getState();

  // TODO: Check if already being sent (is pending, no duplicate requests)

  dispatch(actions.setInitial(key)());
  dispatch(actions.setPending(key)());

  const configOptions = internalSelectors.optionsSelector(state);
  const finalOptions = {
    ...configOptions,
    ...options,
    method,
    body: body ? JSON.stringify(body) : undefined,
  };

  return fetch(url, finalOptions)
    .then(res => {
      const isUnauthenticated = res.status === 401;
      if (isUnauthenticated) {
        if (onUnauthenticated) {
          dispatch(onUnauthenticated());
        }

        const configOnUnauthenticated = internalSelectors.onUnauthenticatedSelector(state);
        if (configOnUnauthenticated) {
          dispatch(configOnUnauthenticated());
        }

        return Promise.resolve();
      }

      // TODO: May need to skip json()
      const isOK = res.ok;
      if (isOK) {
        return res.json()
          .then(json => {
            const resultPromise = new Promise(r => r(json));

            const configOnSuccess = internalSelectors.onSuccessSelector(state);
            if (configOnSuccess) {
              dispatch(configOnSuccess(json));
            }

            if (onSuccess) {
              return Promise.all([
                resultPromise,
                dispatch(onSuccess(json)),
              ]);
            }

            return Promise.all([resultPromise]);
          })
          .then(([json]) => {
            dispatch(actions.setSuccess(key)(json));
            return json;
          });
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

          return json;
        });
    });
};

export default request;
