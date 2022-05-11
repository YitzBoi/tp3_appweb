import AppError from '@/shared/AppError'

export function parseAxiosErrorToAppError (error) {
  if (isNetworkError(error)) {
    const appError = new AppError(
      'Erreur avec le réseau. Impossible de communiquer avec le serveur.'
    )
    return appError
  } else {
    const appError = new AppError(
      error.response.data,
      error.response.statusText,
      error.response.status
    )
    return appError
  }
}

function isNetworkError (error) {
  // https://github.com/axios/axios/issues/383
  return !!error.isAxiosError && !error.response // !! Converts Object to boolean. If it was falsey (e.g. 0, null, undefined, etc.), it will be false, otherwise, true.
}
