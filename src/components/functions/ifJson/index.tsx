import {storageLocal} from 'constants/common';
import {AppDispatch} from 'redux/store/store';

export const ifJson = (
  type: string,
  func: any,
  dispatch: AppDispatch,
  isDelete?: boolean,
  funcDelete?: any,
) => {
  const json = storageLocal.getString(type);
  if (json !== undefined) {
    if (isDelete) {
      dispatch(func());
      storageLocal.delete(type);
      dispatch(funcDelete());
    } else {
      const userObject = JSON.parse(json);
      dispatch(func(userObject));
    }
  }
};
