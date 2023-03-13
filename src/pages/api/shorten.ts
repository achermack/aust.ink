// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, ShortenedURL } from '@prisma/client'
var sh = require("shorthash");
const prisma = new PrismaClient();


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ShortenedURL>
) {
  
  if (req.method == "GET") {
    const hash = req.body.hash
    const getUrl: ShortenedURL | null = await prisma.shortenedURL.findUnique({
      where: {
        hash: hash
      },
    })
    if (getUrl) {
      res.status(200).json(getUrl)
    } else {
      res.status(404)
    }
  }

  if (req.method == "POST") {
    const url = req.body.url
    
    const getExisting: ShortenedURL | null = await prisma.shortenedURL.findUnique({
      where: {
        url: url
      }
    })
    if (!getExisting) {
      const resp = await prisma.shortenedURL.create({
        data: {
          url: url,
          hash: sh.unique(url)
        }
      })
    } else {
      res.status(200).json(getExisting)
    }
  }
  
}
