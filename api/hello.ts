import type { VercelRequest, VercelResponse } from "@vercel/node";
import { NTPClient } from 'ntpclient';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    const clientRequestTime = Date.now();
    let type = 'NTP';
    let time = await new NTPClient().getNetworkTime() ?? null;
    if(!time) {
        time = new Date();
        type = 'server';
    }
    const clientResponseTime = Date.now();

    const roundTripTime = clientResponseTime - clientRequestTime;
	return res.json({
        time: time,
        type: type,
        roundTripTime: roundTripTime
	});
}