import type { Request, Response, NextFunction } from 'express'

export const logMiddlware = (request: Request, response: Response, next: NextFunction) => {
  console.log(`Request received: ${request.method} ${request.path}`)
  next()
}
