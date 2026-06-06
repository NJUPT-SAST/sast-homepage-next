import * as lark from "@larksuiteoapi/node-sdk";

if (!process.env.LARK_APP_ID || !process.env.LARK_APP_SECRET) {
    throw new Error("Missing LARK_APP_ID or LARK_APP_SECRET");
}

const larkClient = new lark.Client({
    appId: process.env.LARK_APP_ID,
    appSecret: process.env.LARK_APP_SECRET,
});

const calendar_id = "feishu.cn_Qfwzb97mZEp9N5lh70UYOg@group.calendar.feishu.cn";

// // Get tenant access token
// const tenantToken = await larkClient.auth.v3.tenantAccessToken.internal({
//     data: {
//         app_id: process.env.LARK_APP_ID,
//         app_secret: process.env.LARK_APP_SECRET,
//     },
// });

async function getCalendarEventsList() {
    const currentTime = Math.floor(new Date().valueOf() / 1000);

    const payload = larkClient.calendar.v4.calendarEvent.list({
        path: {
            calendar_id,
        },
        params: {
            anchor_time: `${currentTime}`,
        },
    });

    return await payload;
}

async function getCalendarEventDetails(event_id: string) {
    const payload = larkClient.calendar.v4.calendarEvent.get({
        path: {
            calendar_id,
            event_id,
        },
        params: {
            need_attendee: true,
        },
    });

    return await payload;
}


export { getCalendarEventsList, getCalendarEventDetails };
