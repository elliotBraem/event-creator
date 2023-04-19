import { request } from "near-social-bridge";

interface CreateThingResponse {
  error?: string;
  success?: boolean;
}

// UPDATE THIS TO MATCH YOUR TYPE
interface CreateThingPayload {
  allDay: boolean;
  start: Date;
  end: Date;
  title: string;
  url: string;
}

const createThing = (payload: CreateThingPayload) => {
  return request<CreateThingResponse>("create-thing", payload);
};
export default createThing;
