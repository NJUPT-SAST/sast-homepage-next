import { ActivitiesGallerySection, ActivitiesRecentSection } from "@/components/activities";
import styles from "./page.module.css";
import { getCalendarEventsList, getCalendarEventDetails } from "@/lib/lark";

export const revalidate = 600;

export interface Activity {
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  link?: string;
}

interface mapping {
  [key: string]: string;
}

const Rooms: mapping = {
  omm_f2b7a9f9ba5afa0b96906cf2cb4f1a06: "大学生活动中心-汇客厅(112 - 113)",
  omm_17a653591966274e91219f66043e1218: "大学生活动中心-101 中区",
};

const possibleDepartments: mapping = {
  校科协: "校科协",
  软研: "软件研发部",
  软研部: "软件研发部",
  软件研发部: "软件研发部",
  多媒体: "多媒体部",
  多媒体部: "多媒体部",
  电子: "电子部",
  电子部: "电子部",
};


export default async function Activities() {
  const LarkActivities: Activity[] = await getCalendarEventsList().then((res) => {
    return Promise.all(
      res.data!.items!.map(async (item) => {
        let organizer = "校科协";
        let title = item.summary!;
        const deptKey = item.summary!.split(" ")[0];

        if (deptKey in possibleDepartments) {
          organizer = possibleDepartments[deptKey];
          title = item.summary!.split(" ").slice(1).join(" ");
        }

        const LarkDetails = (await getCalendarEventDetails(item.event_id!)).data!.event!;
        const location = LarkDetails.attendees?.[0]?.room_id && LarkDetails.attendees?.[0]?.rsvp_status ? Rooms[LarkDetails.attendees[0].room_id] : item.location ? item.location.name! : "";

        const startDateObj = new Date(Number(item.start_time.timestamp!) * 1000);
        const endDateObj = new Date(Number(item.end_time.timestamp!) * 1000);
        const date = `${startDateObj.getFullYear()}/${(startDateObj.getMonth() + 1).toString()}/${startDateObj.getDate().toString()}`;
        const startTime = `${startDateObj.getHours().toString().padStart(2, "0")}:${startDateObj.getMinutes().toString().padStart(2, "0")}`;
        const endTime = `${endDateObj.getHours().toString().padStart(2, "0")}:${endDateObj.getMinutes().toString().padStart(2, "0")}`;
        const time = `${startTime}-${endTime}`;

        return {
          title: title,
          date,
          time,
          location,
          organizer,
          link: item.app_link,
        };
      })
    );
  });


  return (
    <main className={styles.page}>
      <ActivitiesRecentSection LarkActivities={LarkActivities} />
      <ActivitiesGallerySection />
    </main>
  );
}
