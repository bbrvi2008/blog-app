const hasPrefix = ({ type }, prefix) => {
  return type.startsWith(prefix);
}

const isPending = ({ type }) => {
  return type.endsWith("/pending");
}

const isFulfilled = ({ type }) => {
  return type.endsWith("/fulfilled");
}

const isRejected = ({ type }) => {
  return type.endsWith("/rejected");
}

export const isPendingAction = (prefix = '') => {
  return (action) => {
    return hasPrefix(action, prefix) && isPending(action);
  }
}

export const isFulfilledAction = (prefix = '') => {
  return (action) => {
    return hasPrefix(action, prefix) && isFulfilled(action);
  }
}

export const isRejectedAction = (prefix = '') => {
  return (action) => {
    return hasPrefix(action, prefix) && isRejected(action);
  }
}

export const getActionType = (action) => {
  const { type, meta } = action;

  if(!meta) {
    return type;
  }

  const { requestStatus } = meta;
  return type.replace(`/${requestStatus}`, '');
}