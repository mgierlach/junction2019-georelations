# Requires aiohttp
# Requires nest-asyncio

import pandas as pd
from aiohttp import ClientSession
import asyncio
from datetime import timedelta
import ast

import nest_asyncio
nest_asyncio.apply()


def generate_headers(start, end, delta_seconds):
    base_header = {'x-api-key': "iQ0WKQlv3a7VqVSKG6BlE9IQ88bUYQws6UZLRs1B",
                   'Accept': "*/*",
                   'Cache-Control': "no-cache", 'Host': "api.hypr.cl",
                   'Accept-Encoding': "gzip, deflate",
                   'Content-Length': "0", 'Connection': "keep-alive",
                   'cache-control': "no-cache"}
    cur = start
    headers = []
    while cur < end:
        new_cur = cur + timedelta(seconds=delta_seconds)
        times = {"time_start": cur.isoformat() + "Z",
                 "time_stop": new_cur.isoformat() + "Z"}
        cur = new_cur
        headers.append({**base_header, **times})
    return headers


async def fetch(url, params, session):
    async with session.post(url=url, headers=params) as response:
        return await response.read()


async def run(parameters, cur, new_cur):
    url = "https://api.hypr.cl/raw/"
    tasks = []

    # Fetch all responses within one Client session,
    # keep connection alive for all requests.
    async with ClientSession() as session:
        for params in parameters:
            task = asyncio.ensure_future(fetch(url, params, session))
            tasks.append(task)

        responses = await asyncio.gather(*tasks)
        # you now have all response bodies in this variable
        dfs = []
        for response in responses:
            resp = ast.literal_eval(response.decode("utf-8"))
            resp_df = pd.DataFrame(resp)
            for k in resp_df["raw"][0].keys():
                resp_df[k] = resp_df["raw"].apply(lambda x: x[k])
            resp_df = resp_df.drop(["raw", "status", "latitude", "longitude"],
                                   axis=1)
            dfs.append(resp_df)
        total_df = pd.concat(dfs)
        print("Done with time frame" + str(cur) + " - " + str(new_cur))
        return total_df


# Use this function to get the data
#
# Example:
# start = datetime.datetime( year = 2019 , month = 8 , day = 1 , hour = 12 , minute = 0 )
# end = datetime.datetime(year = 2019, month=8, day=1, hour=12, minute=10)
# df = import_hypercell_raw(start, end)
#
# Downloading data for one hour takes 2 minutes
#
def import_hypercell_raw(starttime, stoptime):
    df = pd.DataFrame(columns=["time", "hash", "serial", "distance"])

    cur = starttime

    while cur < stoptime:
        new_cur = cur + timedelta(minutes=15)

        loop = asyncio.get_event_loop()
        headers = generate_headers(cur, new_cur, 30)
        future = asyncio.ensure_future(run(headers, cur, new_cur))
        total_df = loop.run_until_complete(future)
        df = df.append(total_df, ignore_index=True)

        cur = new_cur

    print("Done with downloading data!")
    return df
