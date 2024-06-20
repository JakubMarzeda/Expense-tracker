import { NextFunction, Response, Request } from 'express'

function AuthMiddleware(request: Request, response: Response, next: NextFunction) {
  const isAuthenticated = Math.random() >= 0.5

  if (isAuthenticated) {
    next()
  } else {
    response.status(401).send('Unauthorized')
  }
}

export default AuthMiddleware
