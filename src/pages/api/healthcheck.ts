import {NextApiRequest, NextApiResponse} from 'next'

export default async function handler (req:any, res:any) {
  res.status(200).json({ "status": "ok" })
}