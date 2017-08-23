export const NotImplemented = new Error('Not NotImplemented.')
export const NotInitialized = new Error('Not Initialized')
export const NotFoundFunction = new Error('Not Found Function')
export const MissingArgument = new Error('Missing a argument')
export const FailedHTTPCall = new Error('http call failed')

export const NewError = (str) => new Error(str)

export default { NotImplemented, NotInitialized, NotFoundFunction, MissingArgument, NewError }